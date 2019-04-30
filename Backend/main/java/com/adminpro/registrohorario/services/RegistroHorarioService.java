package com.adminpro.registrohorario.services;


import java.text.SimpleDateFormat;
import java.time.LocalDate;

import java.util.ArrayList;
import java.util.Date;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import com.adminpro.registrohorario.DAO.RegistroHorarioRepository;
import com.adminpro.registrohorario.models.ContadorRegistros;
import com.adminpro.registrohorario.models.RegistroHorario;

@Service
public class RegistroHorarioService {
	
	@Autowired
	RegistroHorarioRepository dao;


	
	public RegistroHorario registerEntry (RegistroHorario registro) {
		LocalDate entryDate = LocalDate.now();
		registro.setFecha(entryDate);
		registro.setHoraEntrada(generateHour());
		return this.dao.save(registro);
	}
	
	public RegistroHorario registerExit(RegistroHorario registro) {	
		registro.setHoraSalida(generateHour());
		return this.dao.save(registro);
		
	}
	
	public List<RegistroHorario> getRegistros (String usuario) {
		LocalDate date = LocalDate.now();
		date=date.minusDays(7);
		System.out.println(date);
		return this.dao.findByUsuarioAndFechaGreaterThan(usuario, date);
	}
	
	public List<ContadorRegistros> obtainNumberUsers (ContadorRegistros contador) {
		LocalDate date = LocalDate.now().minusDays(7);
		List<ContadorRegistros> contadorRegistros = new ArrayList<ContadorRegistros>();
		List<RegistroHorario> registros = dao.findByFechaGreaterThan(date);
		
		for (int i = 1;i<8;i++) {
			contador.date = date.plusDays(i);
			contador.numeroRegistros = registros.stream().filter(c -> c.getFecha().equals(contador.date)).count();
			contadorRegistros.add(new ContadorRegistros(contador.date,contador.numeroRegistros));
		}
		return contadorRegistros;
	}
	
	
	public RegistroHorario existsTodayRegister(RegistroHorario registro) {
		LocalDate todayDate = LocalDate.now();
		return dao.findByUsuarioAndFecha(registro.usuario, todayDate);
	}
	
	private String generateHour() {
		SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
		String dateString = format.format(new Date());
		return dateString;
	}
	
	
}
