import { Component,OnInit } from
'@angular/core';
import { DialogService, DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-plan-list',
    templateUrl: './add-lead-form-component.html',
    styleUrls: ['./add-lead-form-component.scss'],
    providers: [DialogService]
  })
  export class addLeadFormComponent implements OnInit {
   
    leadForm!: FormGroup;
  
    colleges: { id: number, name: string }[] = [];
    // countries: string[] = [];
    public countries = [
      { name: "India (+91)", value: "+91" },
      { name: "United States (+1)", value: "+1" },
      { name: "United Kingdom (+44)", value: "+44" },
      { name: "Canada (+1)", value: "+1" },
      { name: "Australia (+61)", value: "+61" },
      { name: "Germany (+49)", value: "+49" },
      { name: "France (+33)", value: "+33" },
      { name: "Japan (+81)", value: "+81" },
      { name: "China (+86)", value: "+86" },
      { name: "Brazil (+55)", value: "+55" }
    ];
    
    states: string[] = [
      // Indian States
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      
      // Union Territories of India
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Jammu and Kashmir",
      "Ladakh",
      "Lakshadweep",
      "Puducherry",
      
      // UK States
      "England",
      "Scotland",
      "Wales",
      
      // USA States
      "California",
      "Texas",
      "New York"
    ];
    streams: string[] = [
      // Science Streams
      "Science",
      "Physics",
      "Chemistry",
      "Mathematics",
      "Biology",
      
      
      // Commerce Streams
      "Commerce",
      "Accounting",
      "Business Studies",
      "Economics",
      
    
      // Arts/Humanities Streams
      "Arts",
      "History",
      
      
      // Engineering Streams
      "Civil Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
      "Computer Science Engineering",
      "Information Technology",
      
      
      // Medical Streams
      "MBBS",
      "Dentistry",
      "Pharmacy",
      
      
      // Management Streams
      "Business Administration",
      "Hotel Management",
      "Tourism Management",
      
      
      // Law and Legal Studies
      "Law",
      "Criminal Law",
      "Corporate Law",
      "International Law",
      
      // Other Professional and Vocational Streams
      "Fashion Designing",
      "Interior Designing",
      "Animation",
      "Multimedia",
      "Mass Communication",
     
     
    ];
    years: string[] = [
      "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015",
      "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005",
      "2004", "2003", "2002", "2001", "2000"
    ];
    
        sources: string[] = [];
        counsellors: { id: number, name: string }[] = [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
          { id: 3, name: "Michael Johnson" },
          { id: 4, name: "Emily Davis" },
          { id: 5, name: "David Brown" },
          { id: 6, name: "Sophia Martinez" },
          { id: 7, name: "James Wilson" },
          { id: 8, name: "Olivia Harris" },
          { id: 9, name: "Daniel Clark" },
          { id: 10, name: "Emma Lewis" }
        ];
    constructor(public DynamicDialogConfig: DynamicDialogConfig,public ref: DynamicDialogRef,private fb: FormBuilder,private apiService: ApiService,private messageService: MessageService) {

    }
    ngOnInit(): void {
      this.initForm();
      this.fetchSources();
      this.fetchColleges();
    }
    fetchSources(): void {
      console.log("anmol")
      this.apiService.getAllSources().subscribe(
        (response: any) => {
          if (response && response.data) {
            this.sources = response.data.map((source: any) => source.name);  // Assuming name is the field for source names
          }
        },
        (error) => {
          console.error('Error fetching sources:', error);
        }
      );
    }
  
    fetchColleges(): void {
      this.apiService.getPartnerColleges().subscribe(
        (response: any) => {
          if (response && response.data) {
            this.colleges = response.data.map((college: any) => ({
              id: college.clg_id,   // Use the correct field name from the API response
              name: college.clg_name  // Use the correct field name from the API response
            }));
          }
        },
        (error) => {
          console.error('Error fetching colleges:', error);
        }
      );
    }
  
    
    resetLeadForm(): void {
      // Reset the form to its initial state
      this.leadForm.reset({
        name: '',
        email: '',
        phone: '',
        alt_phone: '',
        country: '',
        state: '',
        clg_id: '',
        stream: '',
        year_of_admission: '',
        source: '',
        lead_type: ''
      });
    }
    
    saveLead(): void {
      this.leadForm.markAllAsTouched(); // Mark all fields as touched
      if (this.leadForm.valid) {
        // Form is valid, proceed with API call
        this.apiService.addLead(this.leadForm.value).subscribe({
          next: (response) => {
            // Handle successful response
            console.log('Lead added successfully:', response);
            this.ref.close(true)
          },
          error: (error) => {
            // Handle error response
            console.error('Error saving lead:', error);
            this.ref.close(false)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });

          }
        });

      } else {
        // Handle the case where the form is not valid
        console.log('Form is invalid');
      }
    }
    initForm() {
      this.leadForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        alt_phone: [''],
        country: ['', Validators.required],
        state: ['', Validators.required],
        clg_id: ['', Validators.required],
        stream: ['', Validators.required],
        year_of_admission: ['', Validators.required],
        source: ['', Validators.required],
        lead_type: ['', Validators.required]
      });
    }
  }
