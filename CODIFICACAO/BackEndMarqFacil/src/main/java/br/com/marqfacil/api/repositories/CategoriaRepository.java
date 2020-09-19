package br.com.marqfacil.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.marqfacil.api.entities.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

	/**
	 * Metodo para listar categoria por tipo
	 * 
	 * @param tipo
	 * @param idempresa
	 * @return
	 */
	List<Categoria> findByTipoAndIdempresa(Integer tipo, Integer idempresa);

}
