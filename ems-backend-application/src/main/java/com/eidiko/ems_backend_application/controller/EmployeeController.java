package com.eidiko.ems_backend_application.controller;

import com.eidiko.ems_backend_application.dto.EmployeeDto;

import com.eidiko.ems_backend_application.entity.Employee;
import com.eidiko.ems_backend_application.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/employees")
@Slf4j
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    //BUILD ADD EMPLOYEE REST API
    @CrossOrigin("*")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Only ADMIN can access this method
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
        log.info("employee : {}" , employee);
      Employee savedEmployee = employeeService.createEmployee(employee);
        return new ResponseEntity<>(savedEmployee , HttpStatus.CREATED);
    }

    //BUILD GET EMPLOYEE REST API
    @CrossOrigin("*")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") long id){
     EmployeeDto employee =  employeeService.getEmployeeById(id);
     return ResponseEntity.ok(employee );
    }

    //BUILD GET ALL EMPLOYEE REST API

    @CrossOrigin("*")
    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')") // Only ADMIN can access this method
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {

     List<EmployeeDto>  allEmployees  =employeeService.getAllEmployees();
     log.info("allEmployees : {}" ,allEmployees);
     return   ResponseEntity.ok(allEmployees);
    }

    //BUILD UPDATE EMPLOYEE REST API
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')") // ADMIN and EMPLOYEE can access
    @CrossOrigin("*")
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable long id, @RequestBody Employee employee) {

     EmployeeDto employeeDto1 =  employeeService.updateEmployee(id ,employee);
     return   ResponseEntity.ok(employeeDto1);
    }


    //BUILD DELETE EMPLOYEE REST API
    @CrossOrigin("*")
    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')") // Only ADMIN can access this method
    public ResponseEntity<?> deleteEmployee(@PathVariable  long id) {

     Employee employee = employeeService.deleteEmployee(id);

        return ResponseEntity.ok(employee);

    }
}
