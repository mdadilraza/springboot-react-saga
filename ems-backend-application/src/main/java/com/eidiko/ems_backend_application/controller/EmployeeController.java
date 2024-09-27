package com.eidiko.ems_backend_application.controller;

import com.eidiko.ems_backend_application.dto.EmployeeDto;

import com.eidiko.ems_backend_application.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;




    //BUILD ADD EMPLOYEE REST API


    @CrossOrigin("*")
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){

      EmployeeDto savedEmployeeDto = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployeeDto , HttpStatus.CREATED);
    }

    //BUILD GET EMPLOYEE REST API
    @CrossOrigin("*")
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") long id){
     EmployeeDto employee =  employeeService.getEmployeeById(id);
     return ResponseEntity.ok(employee );
    }

    //BUILD GET ALL EMPLOYEE REST API

    @CrossOrigin("*")
    @GetMapping("")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {

     List<EmployeeDto>  allEmployees  =employeeService.getAllEmployees();
     return   ResponseEntity.ok(allEmployees);
    }

    //BUILD UPDATE EMPLOYEE REST API
    @CrossOrigin("*")
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable long id, @RequestBody EmployeeDto employeeDto) {

     EmployeeDto employeeDto1 =  employeeService.updateEmployee(id ,employeeDto);
     return   ResponseEntity.ok(employeeDto1);
    }


    //BUILD DELETE EMPLOYEE REST API
    @CrossOrigin("*")
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable  long id) {

     EmployeeDto employeeDto  = employeeService.deleteEmployee(id);

        return ResponseEntity.ok(employeeDto);

    }
}
