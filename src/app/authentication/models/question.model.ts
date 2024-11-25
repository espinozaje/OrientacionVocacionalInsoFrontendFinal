export interface Question {
  id: number;
  text: string; 
  area: Area;
  options: Option[];  
  selectedOption?: Option;
}
export interface AdvisoryDTO {
  id: number;
  link: string;
  name: string;
  date: string;  
  time: string; 
  studentId: number | null;
  adviserId: number | null;
  student?: any; 
  adviser?: any; 

}

export interface FileResponse {
  filePath: string;
}

export interface StudentDTO{
    id: number;
    img_profile: string ;
    firstName: string ;
    lastName: string ;
    email: string ;
    plan: string ;
}

export interface Area{
  id: number;
  name: string;
  career: Career[];
}

export interface Option {
  id: number;
  text: string;
  score: number;
}

export interface Career {
  id: number;
  name: string;
  img: string;
  description: string;
  priceMonthly: string;
  location: Location;
}


export interface Location {
  id: number;
  city: string;
  country: string;
  region: string;
}

export interface User{
  id?: number;
  img_profile?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}



export interface Adviser{
  id?: number;
  img_profile?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  specialty: string;
  solicitationStatus: string; 
}

export interface Admin{
  id?: number;
  img_profile?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export enum DayOfWeek {
  Lunes = 'Lunes',
  Martes = 'Martes',
  Miércoles = 'Miércoles',
  Jueves = 'Jueves',
  Viernes = 'Viernes',
  Sábado = 'Sábado',
  Domingo = 'Domingo'
}
export interface Availability {
  dayOfWeek: DayOfWeek;  // Usa el tipo DayOfWeek aquí
  selectedDays: { [key in DayOfWeek]: boolean };  // Esto asegura que solo se puedan usar días válidos
  startTime: string;
  endTime: string;
}


export interface Solicitation {
  id: number;
  student:StudentDTO;
  adviser: Adviser;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}


export interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
}