package br.com.marqfacil.api.services;

import java.util.List;

import br.com.marqfacil.api.entities.Produto;

public interface ProdutoService {

	/**
	 * Listagem de todos os produtos
	 * 
	 * @return
	 */
	List<Produto> listaProdutos();

	/**
	 * Listagem de produto especifico
	 * 
	 * @param idproduto
	 * @return
	 */
	Produto listaProdutosById(Integer idproduto);

	/**
	 * Salvar ou alterar produto
	 * 
	 * @param produto
	 * @return
	 */
	Produto salvarProduto(Produto produto);

	/**
	 * Remover produto por id
	 * 
	 * @param idproduto
	 */
	void removerProduto(Integer idproduto);

	/**
	 * Metodo para listar produtos pela categoria
	 * 
	 * @param idcategoria
	 * @return
	 */
	List<Produto> listarProdutosAtivosPelaCategoria(Integer idcategoria);

	/**
	 * Metodo para listar produtos pela categoria
	 * 
	 * @param idcategoria
	 * @return
	 */
	List<Produto> listarProdutosPelaCategoria(Integer idcategoria);

	/**
	 * Metodo para listar produtos pela categoria e titulo
	 * 
	 * @param idcategoria
	 * @param titulo
	 * @return
	 */
	List<Produto> listarProdutosAtivosPelaCategoriaeTitulo(Integer idcategoria, String titulo);

	/**
	 * Metodo para listar produtos pela categoria e titulo
	 * 
	 * @param idcategoria
	 * @param titulo
	 * @return
	 */
	List<Produto> listarProdutosPelaCategoriaeTitulo(Integer idcategoria, String titulo);

}