<template>
 <div>тут будет таблица...
	<ag-grid-vue
      class="ag-theme-alpine"
      style="height: 500px"
      :columnDefs="columnDefs.value"
      :rowData="rowData.value"
      :defaultColDef="defaultColDef"
      :pagination="true"
	  :paginationPageSize="10"
      rowSelection="multiple"
      animateRows="true"
      @cell-clicked="cellWasClicked"
    />
 </div>
</template>

<script lang="ts">

import {defineComponent } from 'vue';
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
import { reactive, onMounted, ref } from "vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import { getList } from '../service/getTableData';
import { formatTableFields } from '../service/formatTableFields';


export default defineComponent({
	name: "TableData",

	components: {
		AgGridVue
	},

	setup() {
		const gridApi = ref(null);  //Optional - for accessing Grid's API
	
		// Obtain API from grid's onGridReady event
		const onGridReady = (params) => {
			gridApi.value = params.api;
		};

		const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

		// Each Column Definition results in one Column.
		const columnDefs = reactive({
			value: [
				{ 
				headerName: "Номер",
				field: "id"
				}, 
				{
				headerName: "Название",
				field: "name",
				editable:true
				
				},
				{
				headerName: "Дата создания",
				field: "created"
				},
				{
				headerName: "Count",
				field: "count",

				//задаем отрисовку цвета ячейки согласно ТЗ: красный, если count < 5, желтый, если 5<count<20, зеленый - count>20
				cellStyle: params => {
					if(params.value <= 5) {
					return {color: 'red', backgroundColor: 'red' }
					}
					if(5 < params.value && params.value < 20) {
					return {color: 'yellow', backgroundColor: 'yellow' }
					} 
					if(params.value >= 20) {
					return {color: 'green', backgroundColor: 'green' }
					}
					return null;
				}
				},
				{ 
				headerName: "Статус",
				field: "status"
				},
			]});

		// DefaultColDef sets props common to all Columns
		const defaultColDef = {
			sortable: true,
			filter: true,
			flex: 1
		};

		//Async data fetch mock method (getList возвращает промис, см. папку service)
		onMounted(
			()=>{
				const getData = async () => {
					const tableList = await getList();

					const formattedList = formatTableFields(tableList);

					//передаем данные в таблицу
					//@ts-ignore
					rowData.value = formattedList;
				}

				getData();
			}
		) 

		const cellWasClicked = (event) => { // Example of consuming Grid Event
	        const data = event.data;
    	}

		return {
			onGridReady,
      		columnDefs,
      		rowData,
      		defaultColDef,
      		cellWasClicked
		}
	}
})

</script>