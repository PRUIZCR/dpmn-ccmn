import { Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent  {

  title ="Consultas de CCMN/DPMN";
  year =new Date().getFullYear();

}
