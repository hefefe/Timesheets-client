import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { MessageService } from 'primeng/api';
import { PersonInterface } from 'src/app/personInterface';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [MessageService]
})
export class EmployeeComponent {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  employees: PersonInterface[] = [];

  employee: PersonInterface = {};

  selectedEmployee: PersonInterface[] = [];

  submitted: boolean = false;

  cardImageBase64: string = '';

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private employeeService: EmployeeService, private messageService: MessageService) { }

  ngOnInit() {
      this.employeeService.getEmployees().then(data => this.employees = data);

      this.cols = [
          { field: 'id', header: 'Id' },
          { field: 'photo', header: 'Photo' },
          { field: 'firstName', header: 'FirstName' },
          { field: 'lastName', header: 'LastName' },
          { field: 'email', header: 'Email' },
          { field: 'phone', header: 'Phone' },
          { field: 'experience', header: 'Experience' },
          { field: 'position', header: 'Position' },
          { field: 'hourlyPay', header: 'Pay/Hr' },
          { field: 'workDuringWeekInHours', header: 'work Hr/Week' },
          { field: 'user.tempPassword', header: 'temporary Password' }
      ];
  }

  openNew() {
      this.employee = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(employee: PersonInterface) {
      this.employee = { ...employee };
      this.productDialog = true;
  }

  deleteProduct(employee: PersonInterface) {
      this.deleteProductDialog = true;
      this.employee = { ...employee };
  }

  confirmDeleteSelected() {
      this.deleteProductsDialog = false;
      this.employeeService.deleteEmployees(this.selectedEmployee.map(employee => employee.id ?? 0)).subscribe();
      this.employees = this.employees.filter(val => !this.selectedEmployee.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
      this.selectedEmployee = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
      var personId: number[] = [this.employee.id??0]
      this.employeeService.deleteEmployees(personId).subscribe((data) =>{
        if(data.status == 200){
          this.employees = this.employees.filter(val => val.id !== this.employee.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
      this.employee = {};
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
        }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

          if (this.employee.id) {
              // @ts-ignore
              // this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
              // this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          } else {
              // this.product.id = this.createId();
              // this.product.code = this.createId();
              // this.product.image = 'product-placeholder.svg';
              // // @ts-ignore
              // this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
              // this.products.push(this.product);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          }

          this.employees = [...this.employees];
          this.productDialog = false;
          this.employee = {};

  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.employees.length; i++) {
          if (this.employees[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
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
