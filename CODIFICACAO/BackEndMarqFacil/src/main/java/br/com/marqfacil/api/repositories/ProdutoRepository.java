package br.com.marqfacil.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.marqfacil.api.entities.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

	/**
	 * Metodo para listar produtos pela categoria
	 * 
	 * @param idcategoria
	 * @return
	 */
	@Query(nativeQuery = true, value = "SELECT * FROM produtos WHERE fgativo = 1 AND idcategoria = ?1 AND status = 1")
	List<Produto> findByIdcategoriaStatusON(Integer idcategoria);

	/**
	 * Metodo para listar produtos pela categoria
	 * 
	 * @param idcategoria
	 * @return
	 */
	@Query(nativeQuery = true, value = "SELECT * FROM produtos WHERE fgativo = 1 AND idcategoria = ?1")
	List<Produto> findByIdcategoria(Integer idcategoria);

	@Override
	@Modifying
	@Query("UPDATE Produto SET fgativo = 0 WHERE idproduto = ?1")
	void deleteById(Integer idproduto);

	/**
	 * Metodo para listar produtos pela categoria e titulo
	 * 
	 * @param idcategoria
	 * @param titulo
	 * @return
	 */
	@Query(nativeQuery = true, value = "SELECT * FROM produtos WHERE fgativo = 1 AND idcategoria = ?1 AND status = 1 AND titulo LIKE %?2%")
	List<Produto> findByIdcategoriaStatusONByTitulo(Integer idcategoria, String titulo);

	/**
	 * Metodo para listar produtos pela categoria e titulo
	 * 
	 * @param idcategoria
	 * @param titulo
	 * @return
	 */
	@Query(nativeQuery = true, value = "SELECT * FROM produtos WHERE fgativo = 1 AND idcategoria = ?1 AND titulo LIKE %?2%")
	List<Produto> findByIdcategoriaAndTitulo(Integer idcategoria, String titulo);

}
