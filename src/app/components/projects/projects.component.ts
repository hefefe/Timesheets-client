import { Component } from '@angular/core';
import { IProject } from 'src/app/project-interface';
import { ProjectsService } from './projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonInterface } from 'src/app/personInterface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  projects: IProject[] = [];

  workflow: string[] = ["to do", "implementing", "done"];

  constructor(private projectService: ProjectsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
   this.projectService.getProjects().then(data => this.projects = data);
  }

  test(event:any) {
    this.router.navigate(["/home/project/" + event.data.id]);
  }
}
