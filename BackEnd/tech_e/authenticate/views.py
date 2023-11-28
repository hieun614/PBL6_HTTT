
from django.contrib.auth.models import Group
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from authenticate.models import Seller
from authenticate.serializers import AdminSerializer, GroupSerializer, LoginSerializer, SellerSerializer, PasswordSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny,IsAdminUser
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from rest_framework import status
from django.urls import reverse
from validate_email import validate_email
from django.contrib.auth import authenticate
from authenticate import group_permission
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from tech_e import settings
from rest_framework.decorators import action


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class Logout(APIView):
    def post(self,request):
        return Response({"message": "Goodbye!"},status=status.HTTP_200_OK)

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        usernameData = request.data.get("username")
        passwordData = request.data.get("password")
        user = authenticate(request=request,
            username=usernameData,
            password=passwordData
        )
        if user and serializer.is_valid():
            token = get_tokens_for_user(user)
            role = []
            for group in user.groups.all():
                role.append(group.name)
            return Response({
                "message": "login is success!",
                "data": {
                    "id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": role
                },
                "token": token,
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                    "massage": "Login is failed",
                    "error": "username or password is not correct"
                }, status=status.HTTP_400_BAD_REQUEST)


# Register user
class UserView(ViewSet):
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in [ 'retrieve', 'update']:
            return [IsAuthenticated(), ]
        if self.action in ['create']:
            return [AllowAny(), ]
        return super().get_permissions()

    def retrieve(self, request, pk=None):     
        try:
            user = User.objects.get(pk=pk)           
            serializer = UserSerializer(instance= user)
            return Response({
                    "data":serializer.data
                }, status=status.HTTP_200_OK)
        except Exception as e:
             return Response({
                    "error": f'Exception: {e}'
                }, status=status.HTTP_404_NOT_FOUND)
        
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        emailData = request.data["email"]
        usernameData = request.data["username"]
        passwordData = request.data["password"]
        isValidEmail = validate_email(emailData, verify=True)

        if isValidEmail:
            if not serializer.is_valid():
                return Response({
                    "ERROR": serializer.errors,
                }, status=status.HTTP_400_BAD_REQUEST)
            # if User.objects.filter(username=usernameData).exists():
            #     return Response({
            #         "ERROR": "This email or username is exist!"
            #     }, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            send_mail(
                subject='Register account user is success!',
                message='Your information account: \nusername: ' +
                usernameData+'\npassword: '+passwordData,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[emailData]
            )
            return Response({
                "message": "Registration Success!",
                'detail': 'Please check your mail to complete register!!!',
            }, status=status.HTTP_200_OK)
        return Response({
            'ERROR': 'Email not exist! Please re-enter email!!!',
        }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request,pk):     
        try:
            user = User.objects.get(pk=pk)          
            serializer = self.serializer_class(instance=user,data=request.data)
            if not serializer.is_valid():
                return Response({
                    "ERROR": serializer.errors,
                }, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response({
                "message": "Update Profile completed!",
                "data":serializer.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
             return Response({
                    "ERROR": f'Exception: {e}'
                }, status=status.HTTP_400_BAD_REQUEST)
    
    # update user's avt
    @action(methods=['PUT'],detail=True,permission_classes=[IsAuthenticated],url_path="upload-avt")    
    def update_image(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)     
            data = {"user_profile": {'avt':request.data['avt']}}    
            serializer = self.serializer_class(instance=user,data=data)
            if not serializer.is_valid():
                return Response({
                    "message": "Update Profile is failed!",
                    "error": serializer.errors,
                }, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response({
                "message": "Update Profile completed!",
                "data":serializer.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
             return Response({
                    "error": f'Exception: {e}'
                }, status=status.HTTP_400_BAD_REQUEST)

# Register admin
class AdminView(APIView):
    serializer_class = AdminSerializer
    permission_classes = [group_permission.IsAdmin, ]

    def get(self, request, pk=None):
        if pk is not None:
            user = User.objects.filter(pk=pk).get()
            serializer = UserSerializer(instance= user)
            return Response(serializer.data)
        manyUser = User.objects.all()
        serializer = UserSerializer(instance= manyUser,many=True)
        return Response({
            "data":serializer.data
        }, status=status.HTTP_200_OK) 

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        emailData = request.data["email"]
        usernameData = request.data["username"]
        passwordData = request.data["password"]
        isValidEmail = validate_email(emailData, verify=True)
        if isValidEmail:
            if not serializer.is_valid():
                return Response({
                    "message": "Register is Failed!",
                    "error": serializer.errors,
                }, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(email=emailData, username=usernameData).exists():
                return Response({
                    "Error": "This email or username exists!"
                }, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            send_mail(
                subject='Register account staff is success!',
                message='Your information account: \nusername: ' +
                usernameData+'\npassword: '+passwordData,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[emailData]
            )
            return Response({
                "message": "Registration Success!",
                'detail': 'Please check your mail to complete register!!!',
            }, status=status.HTTP_200_OK,)
        return Response({
            "message": "Register is Failed!",
            'error': 'email not exist! Please re-enter email!!!',
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request,pk):     
        user = User.objects.filter(pk=pk).get()
        serializer = self.serializer_class(instance=user,data=request.data)
        if not serializer.is_valid():
            return Response({
                "message": "Update Profile is failed!",
                "error": serializer.errors,
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({
            "message": "Update Profile completed!",
            "data":serializer.data
        }, status=status.HTTP_200_OK,)
    def delete(self, request, *args, **kwargs):
        pass

class RoleView(APIView):
    permission_classes = [AllowAny, ]
    def get(self, request):
        groups = Group.objects.all()
        role = {}
        for group in groups:
            role[group.id] = group.name         
        return Response({
            "role": role
        }, status=status.HTTP_200_OK)

class GroupAndPermissionView(APIView):
    serializer_class = GroupSerializer
    permission_classes = [IsAdminUser, ]
    queryset = Group.objects.all()

    def get(self, request):
        groups = Group.objects.all()
        serializer= GroupSerializer(groups,many=True)
        return Response({
            "data":serializer.data
        }, status=status.HTTP_200_OK)

#Register seller
class SellerView(ViewSet):
    serializer_class = SellerSerializer
    def get_permissions(self):
        if self.action in ['list', 'destroy'] :
            return [IsAdminUser(),] 
        if self.action in ['retrieve'] :
            return [AllowAny(),] 
        if self.action in ['create'] :
            return [group_permission.IsUser(),] 
        if self.action in ['update'] :
            return [group_permission.IsSeller(),] 
        return super().get_permissions()
    def list(self, request):
        queryset = Seller.objects.all()
        serializer = SellerSerializer(queryset, many=True)
        return Response({
            "data":serializer.data
        }, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        try:
            seller = Seller.objects.get(pk=pk)           
            serializer = SellerSerializer(instance= seller)
            return Response({
                    "data":serializer.data
                }, status=status.HTTP_200_OK)
        except Exception as e:
             return Response({
                    "error": f'Exception: {e}'
                }, status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        data = request.data
        userId = self.request.user.id
        if userId != int(data["user"]):
            return Response({
                "error": f"Not allowed to register seller of user {data['user']}!",
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = SellerSerializer(data=data)
        if not serializer.is_valid():
            return Response({
                "message":"Create Seller is Failed!",
                "errors":serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({
            "message":"Create Seller is success!",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)
        
    def update(self, request, pk=None):
        userId = self.request.user.id
        if userId != int(pk):
            return Response({
                "error": f"Not allowed to update the seller {pk}!",
            }, status=status.HTTP_403_FORBIDDEN)
        queryset = Seller.objects.all()
        seller = get_object_or_404(queryset, pk=pk)
        serializer = SellerSerializer(instance=seller, data=request.data)
        if not serializer.is_valid():
            return Response({
                "message":"Seller updated is failed!",
                "errors":serializer.errors,
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({
            "message":"Seller updated is sucess!",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        try:
            seller = Seller.objects.get(pk=pk)           
            seller.delete()
            return Response({
                "message":"Seller deleted is success!"
            }, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
             return Response({
                    "error": f'Exception: {e}'
                }, status=status.HTTP_404_NOT_FOUND)

class PasswordView(APIView):
    def get_permissions(self):
        if self.request.method in ['POST']:
            self.permission_classes = [AllowAny, ]
        if self.request.method in ['PATCH']:
            self.permission_classes = [IsAuthenticated, ]
        return super().get_permissions()
        
    # reset password
    def post(self, request):
        serializer = PasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                "message": "Reset password is Failed!",
                "error": serializer.errors,
            }, status=status.HTTP_400_BAD_REQUEST)
        emailData = request.data["email"]
        isValidEmail = validate_email(emailData, verify=True)
        if isValidEmail:
            if User.objects.filter(email=emailData).exists():
                user = User.objects.get(email=emailData)
                password = User.objects.make_random_password()
                user.set_password(password)
                user.save()
                currentSite = get_current_site(request).domain
                realativeLink = reverse('login_token')
                url = 'http://' + currentSite + realativeLink
                send_mail(
                    subject='Reset your password is success!',
                    message='Hello '+user.username+'!\n your NewPassword is ' +
                    password+'.!!\nClick link to login: '+url+'.',
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[emailData]
                )
                return Response({
                    "message": "Reset password Success!",
                    'detail': 'Please check your mail to complete register!!!',
                }, status=status.HTTP_202_ACCEPTED,)
            return Response({
                "message": "Reset password is Failed!",
                'error': 'Email current have not in database! Please re-enter email!!!',
            }, tatus=status.HTTP_400_BAD_REQUEST)
        return Response({
            "message": "Reset password is Failed!",
            'error': 'Email not exist! Please re-enter email!!!',
        }, status=status.HTTP_400_BAD_REQUEST)

    #change password
    def patch(self, request):
            user = self.request.user
            data = request.data
            serializer = PasswordView(instance=user, data=data)
            if serializer:
                oldPassword = serializer.data['old_password']
                newPassword = serializer.data['new_password']
                confirmNewpass = serializer.data['confirm_newpass']
                if not user.check_password(oldPassword):
                    return Response({
                        'error':'old_password is incorrect!'
                    }, status=status.HTTP_400_BAD_REQUEST)
                if confirmNewpass != newPassword:
                    return Response({   
                        'error':'confirm_password is incorrect!'
                    }, status=status.HTTP_400_BAD_REQUEST)
                user.set_password(serializer.data['new_password'])
                user.save()
                return Response({
                    'message':'changepassword is success!',
                    "data":serializer.data
                }, status=status.HTTP_202_ACCEPTED)
            return Response({
                'message':'changepassword is fail!',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)


    


