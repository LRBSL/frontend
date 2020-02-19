import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RlrComponent } from './pages/rlr/rlr.component';
import { NotaryComponent } from './pages/notary/notary.component';
import { SurveyorComponent } from './pages/surveyor/surveyor.component';

const routes: Routes = [
    { path: "", pathMatch: 'full', redirectTo: "user" },
    {
        path: "user", component: LayoutComponent, children: [
            { path: "", pathMatch: "full", redirectTo: "rlr" },
            { path: "rlr", component: RlrComponent },
            { path: "notary", component: NotaryComponent },
            { path: "surveyor", component: SurveyorComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistrationsRoutingModule { }
