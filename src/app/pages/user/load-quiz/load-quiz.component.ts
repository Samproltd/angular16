// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { QuizService } from 'src/app/services/quiz.service';

// @Component({
//   selector: 'app-load-quiz',
//   templateUrl: './load-quiz.component.html',
//   styleUrls: ['./load-quiz.component.css'],
// })
// export class LoadQuizComponent implements OnInit {
//   catId;
//   quizzes;
//   constructor(private _route: ActivatedRoute, private _quiz: QuizService) {}

//   ngOnInit(): void {
//     this._route.params.subscribe((params) => {
//       this.catId = params.catId;
//       if (this.catId == 0) {
//         console.log('Load all the quiz');

//         this._quiz.getActiveQuizzes().subscribe(
//           (data: any) => {
//             this.quizzes = data;
//             console.log(this.quizzes);
//           },
//           (error) => {
//             console.log(error);
//             alert('error in loading all quizzes');
//           }
//         );
//       } else {
//         console.log('Load specific quiz');

//         this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
//           (data: any) => {
//             this.quizzes = data;
//             console.log(this.quizzes);
//           },
//           (error) => {
//             alert('error in loading quiz data');
//           }
//         );
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  catId: number;
  quizzes: any = [];
  isLoggedIn = false;
  user: any = null;
  quizCategoryTitles: string[] = []; // New variable to store category titles

  constructor(private _route: ActivatedRoute, private _quiz: QuizService, public login: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

    this.login.loginStatusSubject.asObservable().subscribe(() => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });

    this._route.params.subscribe((params) => {
      this.catId = params.catId;
      if (this.catId == 0) {
        console.log('Load all the quiz');

        this._quiz.getActiveQuizzes().subscribe(
          (data: any) => {
            // console.log("bhushan galphade");
            // console.log('User Type:', this.user?.userType);

            // Store quizzes and filter based on userType
            this.quizzes = data.filter((quiz: any) => quiz.category?.title === this.user?.userType);

            // Extract category titles and store them in the new variable
            this.quizCategoryTitles = this.quizzes.map((quiz: any) => quiz.category?.title || '');

            // console.log('Filtered Quizzes:', this.quizzes);
            // console.log('Quiz Category Titles:', this.quizCategoryTitles);
          },
          (error) => {
            console.log(error);
            alert('Error in loading all quizzes');
          }
        );
      } else {
        console.log('Load specific quiz');

        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            // Filter quizzes based on userType
            this.quizzes = data.filter((quiz: any) => quiz.category?.title === this.user?.userType);

            this.quizCategoryTitles = this.quizzes.map((quiz: any) => quiz.category?.title || '');

            // console.log('Filtered Quizzes:', this.quizzes);
            // console.log('Quiz Category Titles:', this.quizCategoryTitles);
          },
          (error) => {
            alert('Error in loading quiz data');
          }
        );
      }
    });
  }
}
