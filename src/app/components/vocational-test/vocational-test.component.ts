import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import {Question} from '../../authentication/models/question.model';
import { VocationalTestService } from '../../service/vocational-test.service';
import { AuthService } from '../../service/auth.service';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-vocational-test',
  standalone:true,
  imports:[CommonModule, HttpClientModule, FormsModule, RouterLink],
  templateUrl: './vocational-test.component.html',
  styleUrls: ['./vocational-test.component.scss']
})

export class VocationalTestComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  loading: boolean = true;
  testResult: any = null;
  errorMessage: string = '';
  
  constructor(
    private vocationalTestService: VocationalTestService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.vocationalTestService.getQuestions().subscribe({
      next: (data: any[]) => {
        this.questions = data.map((question) => ({
          ...question,
          options: question.options || [],
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading questions:', error);
        this.loading = false;
        alert('Error al cargar las preguntas. Intenta de nuevo más tarde.');
      },
    });
  }

  selectOption(option: any): void {
    this.questions[this.currentQuestionIndex].selectedOption = option;

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.submitTest();
    }
  }

  submitTest(): void {
    const test = {
      questions: this.questions.map((question) => ({
        id: question.id,
        text: question.text,
        area: question.area,
        options: question.options,
        selectedOption: question.selectedOption,
      })),
    };
    console.log(test)

    this.vocationalTestService.submitTestRegister(test).subscribe({
      next: (response) => {
        this.testResult = response;
        // Muestra el resultado al usuario
        alert(`${this.testResult.area || 'No se pudo determinar el área'}`);
        this.resetTest();
        this.router.navigate(['/page-principal']);
      },
      error: (error) => {
        this.errorMessage = 'Error al enviar el test. Inténtalo de nuevo.';
        alert(this.errorMessage);  // Mostrar el error como alerta
        console.error(error);
        this.resetTest();  // Reiniciar el test en caso de error
      },
    });
  }

  resetTest(): void {
    // Resetear todas las variables para reiniciar el test
    this.currentQuestionIndex = 0;
    this.testResult = null;
    this.questions = [];
    this.loading = true;
    this.errorMessage = '';
    this.loadQuestions();  // Volver a cargar las preguntas
  }

  getProgress(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }
}
