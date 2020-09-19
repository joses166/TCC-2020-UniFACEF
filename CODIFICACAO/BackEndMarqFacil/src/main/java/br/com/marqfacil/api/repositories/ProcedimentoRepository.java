package br.com.marqfacil.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.marqfacil.api.dtos.SelectItemsProcedimentoDto;
import br.com.marqfacil.api.entities.Procedimento;

@Repository
public interface ProcedimentoRepository extends JpaRepository<Procedimento, Integer> {

	@Query(nativeQuery = true, value = "SELECT * FROM procedimentos WHERE fgativo = 1 AND idcategoria = ?1 AND status = 1")
	List<Procedimento> findProcedimentosAtivosByIdcategoria(Integer idcategoria);

	@Query(nativeQuery = true, value = "SELECT * FROM procedimentos WHERE fgativo = 1 AND idcategoria = ?1")
	List<Procedimento> findByIdCategoria(Integer idcategoria);

	@Query(nativeQuery = true, value = "SELECT * FROM procedimentos WHERE fgativo = 1 AND idcategoria = ?1 AND status = 1 AND titulo LIKE %?2%")
	List<Procedimento> findProcedimentosAtivosByIdcategoriaAndTitulo(Integer idcategoria, String titulo);

	@Query(nativeQuery = true, value = "SELECT * FROM procedimentos WHERE fgativo = 1 AND idcategoria = ?1 AND titulo LIKE %?2%")
	List<Procedimento> findByIdCategoriaAndTitulo(Integer idcategoria, String titulo);

	@Query("SELECT new br.com.marqfacil.api.dtos.SelectItemsProcedimentoDto(p.idprocedimento, p.titulo, c.idcategoria, c.descricao) "
			+ "FROM Procedimento p INNER JOIN Categoria c ON (p.idcategoria = c.idcategoria) "
			+ "WHERE c.idempresa = ?1 AND p.fgativo = 1 AND p.status = 1")
	List<SelectItemsProcedimentoDto> findProcedimentoByEmpresa(Integer idempresa);

	@Override
	@Modifying
	@Query("UPDATE Procedimento SET fgativo = 0 WHERE idprocedimento = ?1")
	void deleteById(Integer idprocedimento);

}