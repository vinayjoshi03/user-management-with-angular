import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';


import { Testdata } from "./testdata";

@NgModule({
  declarations: [
    Testdata
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    //Test
  ]
})
export class TestModule { }
