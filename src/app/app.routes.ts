import { Routes } from '@angular/router';
import { authGuard } from './authentication/guards/auth.guard';
import { authenticatedGuard } from './authentication/guards/authenticated.guard';
import { LoginComponent } from './components/Auth/login/login.component';
import { VocationalTestComponent } from './components/vocational-test/vocational-test.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { PagePrincipalComponent } from './components/Advisor/page-principal/page-principal.component';
import { ForgotPasswordComponent } from './components/Auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/Auth/reset-password/reset-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ApplicationAdvisorComponent } from './components/Advisor/application-advisor/application-advisor.component';
import { DashboardPremiumComponent } from './components/Student/dashboard-premium/dashboard-premium.component';
import { CreateAdvisoryStudentComponent } from './components/Advisor/create-advisory-student/create-advisory-student.component';
import { ListAdvisoryAdvisorComponent } from './components/Advisor/list-advisory-advisor/list-advisory-advisor.component';
import { DashboardFreeComponent } from './components/Student/dashboard-free/dashboard-free.component';
import { advisorGuardGuard } from './authentication/guards/advisor-guard.guard';
import { studentGuardGuard } from './authentication/guards/student-guard.guard';
import { ProfileAdvisorComponent } from './components/Advisor/profile-advisor/profile-advisor.component';
import { ProfileStudentComponent } from './components/Student/profile-student/profile-student.component';
import { ListStudentsComponent } from './components/Advisor/list-students/list-students.component';
import { DashboardAdvisorComponent } from './components/Advisor/dashboard-advisor/dashboard-advisor.component';
import { CarrersComponent } from './components/Student/carrers/carrers.component';
import { ListAdvisoryStudentComponent } from './components/Student/list-advisory-student/list-advisory-student.component';
import { ListAdvisorsComponent } from './components/Student/list-advisors/list-advisors.component';
import { ShowProfileAdviserComponent } from './components/Student/show-profile-adviser/show-profile-adviser.component';
import { ShowProfileStudentComponent } from './components/Advisor/show-profile-student/show-profile-student.component';
import { ChatComponent } from './components/Chat/chat.component';
import { ChangePasswordFirstloginComponent } from './components/change-password-firstlogin/change-password-firstlogin.component';
import { PlansComponent } from './components/Student/plans/plans.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { studentFreeGuard } from './authentication/guards/student-free.guard';
import { ListAdvisorsFreeComponent } from './components/Student/list-advisors-free/list-advisors-free.component';
import { AllStudentsComponent } from './components/Advisor/all-students/all-students.component';
import { MyAdvisorsComponent } from './components/Student/my-advisors/my-advisors.component';
// routes.ts
export const routes: Routes = [
    // Rutas sin autenticación
    {
      path: 'login',
      title: 'Iniciar Sesion',
      component: LoginComponent,
      canActivate: [authenticatedGuard]
    },
    {
      path: 'register',
      title: 'Registrarse',
      component: RegisterComponent,
      canActivate: [authenticatedGuard]
    },
    {
      path: 'forgot-password',
      title: 'Recuperar contraseña',
      component: ForgotPasswordComponent,
      canActivate: [authenticatedGuard]
    },
    {
      path: 'reset-password',
      title: 'Cambiar Contraseña',
      component: ResetPasswordComponent,
      canActivate: [authenticatedGuard]
    },
    {
      path: 'application-advisor',
      title: 'Aplicación a asesor',
      component: ApplicationAdvisorComponent,
      canActivate: [authenticatedGuard]
    },
  
    {
      path: 'chat/:userId',
      title: 'Chat',
      component: ChatComponent
    },
    
    {
      path: 'dashboard-student',
      title: 'Dashboard Student',
      component: DashboardPremiumComponent,
      canActivate: [studentGuardGuard] ,
      children:[
        {
          path: '',
          title: 'Dashboard Student',
          component: CarrersComponent
         
        },
        
        {
          path: 'profile-student',
          title: 'Profile Student',
          component: ProfileStudentComponent
        
        },
        {
          path: 'list-advisories',
          title: 'Asesorias',
          component: ListAdvisoryStudentComponent
        },
        {
          path: 'advisors',
          title: 'Asesores',
          component: ListAdvisorsComponent
        },
        {
          path: 'my-advisors',
          title: 'Mis Asesores',
          component: MyAdvisorsComponent
        },
        {
          path: 'adviser-profile/:id',
          title: 'Perfil Asesor',
          component: ShowProfileAdviserComponent
        },

        {
          path: 'chat/:userId',
          title: 'Chat',
          component: ChatComponent
        },
      ]
    },


    {
      path: 'dashboard-student-free',
      title: 'Dashboard Student',
      component: DashboardFreeComponent,
      canActivate: [studentFreeGuard],
      children:[
        {
          path: '',
          title: 'Dashboard Student',
          component: CarrersComponent
        },
        {
          path: 'plans',
          title: 'Planes',
          component: PlansComponent
        },
        {
          path: 'profile-student',
          title: 'Profile Student',
          component: ProfileStudentComponent
        },
        {
          path: 'advisors',
          title: 'Asesores',
          component: ListAdvisorsFreeComponent
        },

        {
          path: 'adviser-profile/:id',
          title: 'Perfil Asesor',
          component: ShowProfileAdviserComponent
        },
      ]
    },
    {
      path: 'success',
      title: 'Payment Succes',
      component: PaymentSuccessComponent,
      canActivate: [studentFreeGuard]
    },
    
    {
      path: 'test-vocationalp',
      title: 'Test Vocacional',
      component: VocationalTestComponent,
      canActivate: [studentGuardGuard]
    },

    {
      path: 'test-vocationalf',
      title: 'Test Vocacional',
      component: VocationalTestComponent,
      canActivate: [studentFreeGuard]
    },

    
  
    {
      path: 'dashboard',
      title: 'Dashboard Advisor',
      component: PagePrincipalComponent,
      canActivate: [advisorGuardGuard],
      children: [
        {
          path: 'advisor',
          title: 'Dashboard Advisor',
          component: DashboardAdvisorComponent
        },
        {
          path: 'change-password',
          component: ChangePasswordFirstloginComponent,
     
        },
        {
          path: 'list-student',
          title: 'Students',
          component: ListStudentsComponent
        },
        {
          path: 'all-students',
          title: 'Estudiantes',
          component: AllStudentsComponent
        },
        {
          path: 'create-advisory-student',
          title: 'Create Advisory',
          component: CreateAdvisoryStudentComponent
        },
        {
          path: 'list-advisories',
          title: 'Advisories',
          component: ListAdvisoryAdvisorComponent
        },
        {
          path: 'profile-advisor',
          title: 'Profile Advisor',
          component: ProfileAdvisorComponent
        },
        {
          path: 'student-profile/:id',
          title: 'Perfil Estudiante',
          component: ShowProfileStudentComponent
        },
        {
          path: 'chat/:userId',
          title: 'Chat',
          component: ChatComponent
        }
        
      ]
    },

  
    // Ruta por defecto y redireccionamiento
    {
      path: '**',
      redirectTo: 'home'
    },
    {
      path: 'home',
      title: 'Home',
      component: HomePageComponent,
      canActivate: [authenticatedGuard]
    }
  ];