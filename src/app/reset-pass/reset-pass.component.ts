import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// import { FuseConfigService } from '@fuse/services/config.service';
// import { fuseAnimations } from '@fuse/animations';
// import { AuthService } from 'app/services/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'app/services/login.service';
@Component({
    selector: 'app-reset-pass',
    templateUrl: './reset-pass.component.html',
    styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

    resetPasswordForm: FormGroup;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    // Private
    private _unsubscribeAll: Subject<any>;
    public date: any;
    c: any;
    see: boolean;
    c1: any;
    see1: boolean;
    log = false;
    email: any;
    userType: any;
    reset: any;
    path: any;
    constructor(
        /* private _fuseConfigService: FuseConfigService, private authService: AuthService, */
        private _formBuilder: FormBuilder, public snackBar: MatSnackBar, public router: Router,
        private route: ActivatedRoute, private signServe: LoginService
    ) {
        this.path == '';
        this.reset = localStorage.getItem('reset');
        this.c = 1;
        this.c1 = 1;
        this.route.queryParams.subscribe(params => {
            this.path = params['path'];
        });
        this.route.queryParams.subscribe(params => {
            this.email = params['email'];
        });
        this.route.queryParams.subscribe(params => {
            this.userType = params['ut'];
        });
        this.route.queryParams.subscribe(params => {
            this.date = params['ts'];
        });
        var test = Date.now();

        var x = (test - parseInt(this.date)) / 1000;
        console.log(test, this.date, x);

        if (x > 1800) {
            this.reset = 'true';
        }
        // Configure the layout
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        const PWDRegex = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/);
        this.resetPasswordForm = this._formBuilder.group({
            password: ['', [Validators.required, Validators.pattern(PWDRegex)]],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });
        this.resetPasswordForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
            });
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    view(input: any): any {
        input.type = input.type === 'password' ? 'text' : 'password';
        this.c++;
        if (this.c % 2 == 0) {
            this.see = true;
        }
        else {
            this.see = false;
        }
    }
    view2(input: any): any {
        input.type = input.type === 'password' ? 'text' : 'password';
        this.c1++;
        if (this.c1 % 2 == 0) {
            this.see1 = true;
        }
        else {
            this.see1 = false;
        }
    }

    get b() {
        return this.resetPasswordForm.controls;
    }
    onResetSubmit() {
        // this.log = true;
        if (this.resetPasswordForm.valid) {
            this.signServe.resetPass(this.resetPasswordForm.value.passwordConfirm, this.email, this.userType).subscribe(ResetRes => {
                console.log(ResetRes);

                if (ResetRes.response == "200") {
                    this.openSnackBar1("Your password is changed succesfully");
                    localStorage.setItem('reset', 'true');
                    this.router.navigate(['/login']);
                }
                else {
                    this.openSnackBar("Email-Id not associated with SuiteSocial account");
                }
            }, error => {
                // this.log = false;
                this.openSnackBar("Email-Id not associated with SuiteSocial account");
            })
        }
    }
    openSnackBar(message) {
        this.snackBar.open(message, 'Try Again', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    openSnackBar1(message) {
        this.snackBar.open(message, '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { 'passwordsNotMatching': true };
};
