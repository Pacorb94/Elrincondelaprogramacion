//Importamos el servicio, los módulos de las rutas y los componentes
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home.component';

//Definimos las rutas
const appRoutes:Routes=[
    {path:'', component:HomeComponent}
];
//Exportamos la configuración
export const appRoutingProviders:any[]=[];
//Esta variable tendrá como valor todas las rutas
export const routing:ModuleWithProviders<any>=RouterModule.forRoot(appRoutes);











