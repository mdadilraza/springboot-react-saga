package com.eidiko.ems_backend_application.config;

import com.eidiko.ems_backend_application.entity.Role;
import com.eidiko.ems_backend_application.entity.Roles;
import com.eidiko.ems_backend_application.repository.RoleRepository;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

public class RoleDeserialize extends JsonDeserializer<Role> {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        String roleName = jsonParser.getText();
        return roleRepository.findByName(Roles.valueOf(roleName))
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
    }
}
