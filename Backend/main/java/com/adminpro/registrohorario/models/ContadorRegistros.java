package com.adminpro.registrohorario.models;

import java.time.LocalDate;

public class ContadorRegistros {
	public LocalDate date;
	public Long numeroRegistros;
	
	
	public ContadorRegistros() {
		
	}


	public ContadorRegistros(LocalDate date, Long numeroRegistros) {
		super();
		this.date = date;
		this.numeroRegistros = numeroRegistros;
	}


	public LocalDate getDate() {
		return date;
	}


	public void setDate(LocalDate date) {
		this.date = date;
	}


	public Long getNumeroRegistros() {
		return numeroRegistros;
	}


	public void setNumeroRegistros(Long numeroRegistros) {
		this.numeroRegistros = numeroRegistros;
	}
	
	
}
