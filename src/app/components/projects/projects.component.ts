import { Component } from '@angular/core';
import { IProject, SprintDurationType } from 'src/app/project-interface';
import { ProjectsService } from './projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Experience, ISearchPerson, PersonInterface, Position } from 'src/app/person-Interface';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  projects: IProject[] = [];

  project: IProject = {};

  deleteProjectDialog = false;

  projectDialog = false;

  cardImageBase64: string = '';

  image: any;

  sprintDuration:string[] = [];
  enumsSprintDuration = SprintDurationType;

  experience:string[] = [];
  enumsExperience = Experience;

  position:string[] =[];
  enumsPosition = Position;


  projectMakers: PersonInterface[] = [];

  employeesInProject: PersonInterface[] = [];
  employees: PersonInterface[] = [];

  searchQuery: ISearchPerson = {};

  searchSubject = new Subject<ISearchPerson>();

  editingProject: boolean = false;

  constructor(private projectService: ProjectsService, private router: Router, private route: ActivatedRoute) {
    this.sprintDuration= Object.values(this.enumsSprintDuration);
    this.experience= Object.keys(this.enumsExperience);
    this.position= Object.keys(this.enumsPosition);

    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(() => {
        this.projectService.searchPerson(this.searchQuery).subscribe((data:any)=>{
          this.employees = data;
        });
      });
  }

  ngOnInit() {
   this.projectService.getProjects().then(data => this.projects = data);
  }

  test(event:any) {
    this.router.navigate(["/home/project/" + event.data.id]);
  }

  deleteProject(project: IProject) {
    this.deleteProjectDialog = true;
    this.project = {...project};
}

confirmDelete() {
  this.deleteProjectDialog = false;
  var projectId: number = this.project.id??0;
  console.log(projectId);
  this.projectService.deleteProject(projectId).subscribe((data:any)=>{
    if(data.status == 200){
      this.projects = this.projects.filter(val => val.id !== this.project.id);
      this.project = {};
    }
  });
}
openNew(){
  this.editingProject = false;
  this.project = {};
  this.projectDialog = true;
  this.projectService.getProjectMakers().then(data => this.projectMakers = data);
  this.project.endOfSprint = this.project.endOfSprint;
  this.project.workflow = ["to do", "implementing", "done"];
  this.projectService.searchPerson(this.searchQuery).subscribe((data:any)=>{this.employees = data;});
}


saveProject() {
  this.project.persons = this.employeesInProject.map(data => data.id!);
        this.projectService.saveProject(this.project).subscribe((data:any) => {
          this.projects[this.findArrayPlacement(data.id)] = data;
          this.projects = [...this.projects];
          if (this.image != null){
            this.projectService.saveProjectPhoto(data.id, this.image).subscribe((data:IProject) =>{
              this.projects[this.findArrayPlacement(data.id!)] = data;
              this.image = null;
            });
          }
        });
      this.employees = [...this.employees];
      this.projectDialog = false;
      this.project = {};
      this.employeesInProject = [];
      this.cardImageBase64 = '';
}

findArrayPlacement(id:number){
  for (let i = 0; i < this.projects.length; i++) {
    if (this.projects[i].id == id){
      return i;
    }
  }
  return this.projects.length;
}

hideDialog(){
  this.projectDialog = false;
  this.projectDialog = false;
  this.project = {};
  this.employeesInProject = [];
  this.cardImageBase64 = '';
}

editProject(project: IProject){
    this.project = { ...project };
    this.project.person = Object.assign({}, this.project.person);
    this.projectService.getEmployeesInProject(project.id!).then((data:any) => this.employeesInProject = data);
    this.projectService.getProjectMakers().then(data => this.projectMakers = data);
    this.projectService.searchPerson(this.searchQuery).subscribe((data:any)=>{this.employees = data;});
    this.projectDialog = true;
    this.editingProject = true;
}

CreateBase64String(fileInput: any) {
  if (fileInput.target.files && fileInput.target.files[0]) {
    this.image = fileInput.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = rs => {
        const imgBase64Path = e.target.result;
        this.cardImageBase64 = imgBase64Path;
      };
    };
    reader.readAsDataURL(fileInput.target.files[0]);
  }
}

}
