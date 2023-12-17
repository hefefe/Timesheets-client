import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  private id:number = 0;
  private sub: any;
  constructor(private route: ActivatedRoute, private _location: Location) {}
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  backClicked() {
    this._location.back();
  }
}
