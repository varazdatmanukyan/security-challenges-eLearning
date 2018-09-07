import { UserService } from './../services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



export class CustomValidation {

  constructor(private userService: UserService) { }
  static match (component: any, field1: string, field2: string): { matchErr:  boolean } | null {

    if (component.myForm) {
      const value1: string = component.myForm.controls[field1].value;
      const value2: string = component.myForm.controls[field2].value;
      if (value1 !== value2) {
        return { matchErr: true};
      }
    }
    return null;
  }


  static unique(component: any, field: string): Promise<any> {
    if (component.myForm && component.myForm.controls[field].value) {
      const { value }: { value: string} = component.myForm.controls[field];
      return component.userService.checkUnique(field, value);
    }
  }
}


