import { Component, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };

  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        //categories load
        this.categories = data;
        // console.log(this.categories);
      },

      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'error in loading data from server', 'error');
      }
    );
  }
  //
  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    //validation...

    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data) => {
        // Swal.fire('Success', 'quiz is added', 'success');
        Swal.fire('Success', 'Quiz is added', 'success').then(() => {
          // ✅ Redirect to All Exams page after clicking "OK" in Swal
          this.router.navigate(['/admin/view-quizzes']);
        });
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: '',
          },
        };
      },

      (error) => {
        Swal.fire('Error!! ', 'Error while adding quiz', 'error');
        console.log(error);
      }
    );
  }
}
