import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { addLeadFormComponent } from '../add-lead-form-component/add-lead-form-component';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  leads: any = {
    'all': { data: [], row: 10, first: 0, page: 1, count: -1, lastSearch: '' },
    'fav': { data: [], row: 10, first: 0, page: 1, count: -1, lastSearch: '' },
    'untouch': { data: [], row: 10, first: 0, page: 1, count: -1, lastSearch: '' }
  }; // Array to store leads
  error: string = ''; // Variable to handle errors
  isLoading: boolean = false; // Loader flag to indicate API call in progress
  activeTab: string = 'all';
  ref: DynamicDialogRef | undefined;




  constructor(private apiService: ApiService, private router: Router,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.fetchLeads(this.activeTab, true); // Fetch leads when component loads
  }
  // Fetch leads with pagination
  fetchLeads(leadType: string, refreshData: boolean): void {
    const rows = this.leads[this.activeTab].row;
    const firstRowIndex = this.leads[this.activeTab].first;
    const page = this.leads[this.activeTab].page
    const search = this.leads[this.activeTab].lastSearch;
    console.log("leads fethcing")
    this.isLoading = true; // Show loader
    const params = {
      pageNo: page,
      limit: rows,
      searchByName: search,
      leadType: leadType
    }
    if (!refreshData) {
      this.isLoading = false;
      return;
    }

    this.apiService.getAllLeads(params).subscribe({
      next: (response) => {
        console.log("response of leads,", response)
        this.leads[leadType].data = response.data || [];
        // Assuming `data` contains the list of leads
        this.leads[leadType].count = response.count || 0; // Assuming `totalLeads` is returned in the response
        this.isLoading = false; // Hide loader
      },
      error: (error) => {
        this.error = 'Failed to fetch leads'; // Handle error
        console.error('Error fetching leads:', error);
        this.isLoading = false; // Hide loader
      }
    });
  }

  fetchLeadsOnPageChange(event: any) {
    console.log(event);
    this.leads[this.activeTab].first = event.first;
    this.leads[this.activeTab].page = 1 + (event.first / event.rows)
    this.leads[this.activeTab].rows = event.rows;
    this.fetchLeads(this.activeTab, true)
  }
  search() {
    this.fetchLeads(this.activeTab, true);
  }
  resetSearch() {
    this.leads[this.activeTab].lastSearch = '';
    this.fetchLeads(this.activeTab, true);
  }
  handleLinkClick(link: string) {
    console.log('Link clicked:', link);
    this.activeTab = link;
    this.fetchLeads(this.activeTab, this.leads[this.activeTab].count == -1)
    // Perform any desired actions here based on the clicked link
    // For example, navigate to a different route, update a property, etc.
  }
  async showForm() {

    this.ref = this.dialogService.open(addLeadFormComponent, {
      data: {},
      header: 'Add New Lead',
      closable: false,
    });

    const subscription = this.ref.onClose.subscribe(async (data: any) => {
      if(data){
        this.resetLeads();
      }
      subscription.unsubscribe();
    });
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  resetLeads(){
    this.leads = {
      'all': { data: [], row: 10, first: 0, page: 1, count: -1, lastSearch: '' },
      'fav': { data: [], row: 10, first: 0, page: 1, count: -1, lastSearch: '' },
      'untouch': { data: [], row: 10, first: 0, page: 1, count: -1, lastSearch: '' }
    }; 
    this.fetchLeads(this.activeTab,true)
  }
}
