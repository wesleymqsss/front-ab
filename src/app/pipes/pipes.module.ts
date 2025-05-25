import { NgModule } from "@angular/core";
import { CapitalizeFirstPipe } from "./capitalize-first-pipe.pipe";
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [
    CapitalizeFirstPipe,
    TruncatePipe
  ],
  exports: [
    CapitalizeFirstPipe,
    TruncatePipe
  ],
})
export class PipesModule { }