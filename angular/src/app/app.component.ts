import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

constructor( private serviceTitle: Title, private router: Router, private activatedRoute: ActivatedRoute, ) {
             }
ngOnInit() {


  const appTitle = this.serviceTitle.getTitle();
  this.router.events.pipe(
   filter(events => events instanceof NavigationEnd),
   map(() => {
     const child = this.activatedRoute.firstChild;
     if (child.snapshot.data['title']) {
       return child.snapshot.data['title'];
     }
   })
 ).subscribe((titl: string) => {
   this.serviceTitle.setTitle(titl);
 });

}

}
