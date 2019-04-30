package com.adminpro.registrohorario.controllers;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import com.adminpro.registrohorario.models.ContadorRegistros;
import com.adminpro.registrohorario.models.RegistroHorario;
import com.adminpro.registrohorario.services.RegistroHorarioService;

@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/")
public class RegistroHorarioController {
	
	@Autowired
	RegistroHorarioService registroService;
	
	
	
	@PostMapping(value="/registerEntry")
	public RegistroHorario registerEntry(@RequestBody RegistroHorario registro) {
		RegistroHorario today_register = registroService.existsTodayRegister(registro);
		//System.out.println(today_register.usuario);
		if(today_register == null ) {
			return registroService.registerEntry(registro);
			//System.out.println(registro.fecha);
			//return "Hora entrada creada "+ registro.horaEntrada + registro.usuario;
		}else {
			return registro;
			//return "Registro entrada ya creado";
		}
	}
	
	@PutMapping(value="/registerExit" , produces = "application/json")
	public  RegistroHorario registerExit(@RequestBody RegistroHorario registro) {
		RegistroHorario today_register = registroService.existsTodayRegister(registro);
		if(today_register!=null) {
			return registroService.registerExit(today_register);
			//return ResponseEntity.ok().body("Hora salida actualizada a "+ today_register.horaSalida);
			//return "Hora salida actualizada "+ today_register.horaSalida;
		}else {
			
			return today_register;
			//return ResponseEntity.ok().body("Usuario no encontrado.");
			//return "Usuario no encontrado";
		}
	}
	
	@GetMapping("/getRegisters/{usuario_id}")
	public List<RegistroHorario> getRegistros(@PathVariable("usuario_id") String usuario_id) {
		System.out.println(usuario_id);
		return registroService.getRegistros(usuario_id);
		
	}
	
	@GetMapping("/getUserNumbers")
	public List<ContadorRegistros> getRegistros() {
		
		return registroService.obtainNumberUsers(new ContadorRegistros());
		
	}
	
}
