import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // <-- Import this for reactive forms
import { HttpClientModule } from '@angular/common/http'; // <-- Needed for API requests
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PasswordModule } from 'primeng/password'; 
import { DividerModule } from 'primeng/divider';
import { LeadsComponent } from './leads/leads.component';
import { TableModule } from 'primeng/table';
import { AppTopBarComponent } from './top-bar-component/app.topbar.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { addLeadFormComponent } from './add-lead-form-component/add-lead-form-component';
import { DialogService } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeadsComponent,
    AppTopBarComponent,
    addLeadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,  // <-- Add this for forms
    HttpClientModule,
    DividerModule,
    ToastrModule.forRoot(),  // <-- Toastr for notifications
    PasswordModule,
    ButtonModule,
    TableModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    ButtonModule,
    StyleClassModule,
    IconFieldModule,
    InputIconModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    ToastModule,
    DropdownModule

    
  ],
  providers: [
    MessageService,DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
