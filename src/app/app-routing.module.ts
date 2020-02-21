import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormEmpresaComponent } from './form-empresa/form-empresa.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: FormEmpresaComponent },
  { path: 'empresas/:id', component: FormEmpresaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
