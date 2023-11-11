import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import * as svgIcons from '@progress/kendo-svg-icons';
import {
  SVGIcon,
  eyeIcon,
} from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('password') public textbox: TextBoxComponent;

  public eyeIcon: SVGIcon = eyeIcon;

  submitted = false;
  returnUrl: string;

  public form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    loggedin: new FormControl()
  });

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    // this.form = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
    // this.form.valueChanges.pipe(
    //   filter(data => this.form.valid),
    //   map(data => {
    //     return data
    //   })
    // ).subscribe(data => console.log(JSON.stringify(data)));
  }

  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.form.controls; }

  public clearForm(): void {
    this.form.reset();
  }

  public login(): void {
    this.form.markAllAsTouched();

    console.log(this.f['username'].value);
    console.log(this.f['password'].value);

    // console.log(this.form.value);
    if (this.f['username'].value == 'NEIL') {
    this.router.navigateByUrl('/mainmenuboard');
    }

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;
    inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
  }
  public ngAfterViewInit(): void {
    this.textbox.input.nativeElement.type = 'password';
  }

  //define a function submitform to be called
  public submitForm(): void {

  }

  // // define a function addnumbertostart
  // public addnumbertostart(): void {


  // }


  //define a function to numberToText
  


}
