package br.com.marqfacil.api.services.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.marqfacil.api.entities.Produto;
import br.com.marqfacil.api.repositories.ProdutoRepository;
import br.com.marqfacil.api.services.ProdutoService;

@Service
public class ProdutoServiceImpl implements ProdutoService {

	private final static Logger log = LoggerFactory.getLogger(ProdutoServiceImpl.class);

	@Autowired
	private ProdutoRepository produtoRepository;

	@Override
	public List<Produto> listaProdutos() {
		log.info("Listagem de todos os produtos");
		return this.produtoRepository.findAll();
	}

	@Override
	public Produto listaProdutosById(Integer idproduto) {
		log.info("Listagem de produto especifico");
		return this.produtoRepository.findById(idproduto).orElse(null);
	}

	@Override
	public Produto salvarProduto(Produto produto) {
		log.info("Salvar ou alterar produto");
		return this.produtoRepository.save(produto);
	}

	@Override
	public void removerProduto(Integer idproduto) {
		log.info("Remover produto por id");
		this.produtoRepository.deleteById(idproduto);
	}

	@Override
	public List<Produto> listarProdutosPelaCategoria(Integer idcategoria) {
		log.info("Listar produtos por idcategoria");
		return this.produtoRepository.findByIdcategoria(idcategoria);
	}

	@Override
	public List<Produto> listarProdutosAtivosPelaCategoria(Integer idcategoria) {
		log.info("Listar produtos por idcategoria");
		return this.produtoRepository.findByIdcategoriaStatusON(idcategoria);
	}

	@Override
	public List<Produto> listarProdutosAtivosPelaCategoriaeTitulo(Integer idcategoria, String titulo) {
		log.info("Listar produtos por idcategoria e titulo");
		return this.produtoRepository.findByIdcategoriaStatusONByTitulo(idcategoria, titulo);
	}

	@Override
	public List<Produto> listarProdutosPelaCategoriaeTitulo(Integer idcategoria, String titulo) {
		log.info("Listar produtos por idcategoria e titulo");
		return this.produtoRepository.findByIdcategoriaAndTitulo(idcategoria, titulo);
	}

}