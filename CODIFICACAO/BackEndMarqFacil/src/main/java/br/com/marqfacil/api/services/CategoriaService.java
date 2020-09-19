package br.com.marqfacil.api.services;

import java.util.List;

import br.com.marqfacil.api.entities.Categoria;

public interface CategoriaService {

	/**
	 * Metodo para listar todas as categorias
	 * 
	 * @param idempresa
	 * @return
	 */
	List<Categoria> listAllCategorias();

	/**
	 * Categorias por idcategoria
	 * 
	 * @param idcategoria
	 * @return
	 */
	Categoria listCategoriaById(Integer idcategoria);

	/**
	 * Metodo para salvar ou alterar uma categoria
	 * 
	 * @param categoria
	 * @return
	 */
	Categoria salvarCategoria(Categoria categoria);

	/**
	 * Metodo para remover uma categoria
	 * 
	 * @param idcategoria
	 */
	void removerCategoria(Integer idcategoria);

	/**
	 * Metodo para listar categoria por tipo
	 * 
	 * @param tipo
	 * @return
	 */
	List<Categoria> listarPorTipoEIdempresa(Integer tipo, Integer idempresa);

}