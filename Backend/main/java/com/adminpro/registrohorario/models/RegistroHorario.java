package com.adminpro.registrohorario.models;

import java.io.Serializable;
import java.time.LocalDate;



import org.springframework.data.annotation.Id;



import javax.validation.constraints.NotNull;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.mongodb.lang.NonNull;



@Document(collection = "Registro")
public class RegistroHorario implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	public ObjectId _id;
	
	@NotNull(message = "Se debe especificar el usuario" )
	@NonNull
	public String usuario;
	public LocalDate fecha;
	public String horaEntrada;
	public String horaSalida;
	
	public RegistroHorario() {
		
	}
	

	public RegistroHorario(ObjectId _id, String usuario, LocalDate fecha, String horaEntrada, String horaSalida) {
		super();
		this._id = _id;
		this.usuario = usuario;
		this.fecha = fecha;
		this.horaEntrada = horaEntrada;
		this.horaSalida = horaSalida;
	}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public LocalDate getFecha() {
		return fecha;
	}

	public void setFecha(LocalDate fecha) {
		this.fecha = fecha;
	}

	public String getHoraEntrada() {
		return horaEntrada;
	}

	public void setHoraEntrada(String horaEntrada) {
		this.horaEntrada = horaEntrada;
	}

	public String getHoraSalida() {
		return horaSalida;
	}

	public void setHoraSalida(String horaSalida) {
		this.horaSalida = horaSalida;
	}
	
	

}
