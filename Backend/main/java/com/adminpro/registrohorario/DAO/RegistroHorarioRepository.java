package com.adminpro.registrohorario.DAO;



import java.time.LocalDate;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;


import com.adminpro.registrohorario.models.RegistroHorario;

public interface RegistroHorarioRepository extends MongoRepository<RegistroHorario, ObjectId>{
	public RegistroHorario findByUsuarioAndFecha(String usuario, LocalDate todayDate);
	public List<RegistroHorario> findByUsuarioAndFechaGreaterThan(String usuario, LocalDate date);
	public List<RegistroHorario> findByFechaGreaterThan(LocalDate date);
}
