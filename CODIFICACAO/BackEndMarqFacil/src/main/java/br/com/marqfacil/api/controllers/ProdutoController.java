package br.com.marqfacil.api.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.marqfacil.api.dtos.ProdutoDto;
import br.com.marqfacil.api.entities.Produto;
import br.com.marqfacil.api.response.Response;
import br.com.marqfacil.api.services.ProdutoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/produtos")
@Api(value = "API para Sistema de Clínicas Estéticas.")
public class ProdutoController {

	private static final Logger log = LoggerFactory.getLogger(ProdutoController.class);

	@Autowired
	private ProdutoService produtoService;

	/**
	 * Metodo - Rota que retorna a lista com todos os produtos cadastrados.
	 * 
	 * @return
	 */
	@ApiOperation(value = "Rota que retorna a lista com todos os produtos cadastrados.")
	@GetMapping
	public ResponseEntity<Response<List<Produto>>> listarProdutos() {
		log.info("Rota que retorna a lista com todos os produtos cadastrados.");
		Response<List<Produto>> response = new Response<List<Produto>>();
		try {
			List<Produto> produtos = this.produtoService.listaProdutos();
			response.setData(produtos);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem produtos cadastrados na base de dados.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Rota para listar o produto pelo id.
	 * 
	 * @return
	 */
	@ApiOperation(value = "Rota para listar o produto pelo id.")
	@GetMapping("/{id}")
	public ResponseEntity<Response<Produto>> listarProdutoPorId(@PathVariable("id") Integer idproduto) {
		log.info("Rota para listar o produto pelo id.");
		Response<Produto> response = new Response<Produto>();
		try {
			Produto produto = this.produtoService.listaProdutosById(idproduto);
			response.setData(produto);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existe nenhum produto cadastrado com o id especificado.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Metodo - Rota para listar todos os produtos ativos pelo idcategoria.
	 * 
	 * @param idcategoria
	 * @return
	 */
	@ApiOperation(value = "Rota para listar todos os produtos ativos pelo idcategoria.")
	@GetMapping("/categoria/{id}/ativos")
	public ResponseEntity<Response<List<Produto>>> listarProdutosAtivosPelaCategoria(
			@PathVariable("id") Integer idcategoria) {
		log.info("Rota para listar todos os produtos ativos pelo idcategoria.");
		Response<List<Produto>> response = new Response<List<Produto>>();
		try {
			List<Produto> produtos = this.produtoService.listarProdutosAtivosPelaCategoria(idcategoria);
			response.setData(produtos);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem produtos cadastrados com o idcategoria especificado.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Metodo - Rota para listar todos os produtos pelo idcategoria.
	 * 
	 * @param idcategoria
	 * @return
	 */
	@ApiOperation(value = "Rota para listar todos os produtos pelo idcategoria.")
	@GetMapping("/categoria/{id}")
	public ResponseEntity<Response<List<Produto>>> listarProdutosPelaCategoria(
			@PathVariable("id") Integer idcategoria) {
		log.info("Rota para listar todos os produtos pelo idcategoria.");
		Response<List<Produto>> response = new Response<List<Produto>>();
		try {
			List<Produto> produtos = this.produtoService.listarProdutosPelaCategoria(idcategoria);
			response.setData(produtos);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem produtos cadastrados com o idcategoria especificado.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Metodo - Rota para cadastrar um novo produto.
	 * 
	 * @param produtoDto
	 * @param result
	 * @return
	 */
	@ApiOperation(value = "Rota para cadastrar um novo produto.")
	@PostMapping("/operacao")
	public ResponseEntity<Response<Produto>> cadastrarProduto(@RequestBody ProdutoDto produtoDto,
			BindingResult result) {

		log.info("Rota para cadastrar um novo produto.");
		Response<Produto> response = new Response<Produto>();

		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}

		Produto produto = new Produto();

		produto.setDescricao(produtoDto.getDescricao());
		produto.setFgativo(1);
		produto.setIdcategoria(produtoDto.getIdcategoria());
		produto.setImagem(produtoDto.getImagem());
		produto.setPreco(produtoDto.getPreco());
		produto.setStatus(produtoDto.getStatus());
		produto.setTitulo(produtoDto.getTitulo());

		produto = this.produtoService.salvarProduto(produto);

		response.setData(produto);
		return ResponseEntity.ok(response);
	}

	/**
	 * Metodo - Rota para alterar um produto.
	 * 
	 * @param idproduto
	 * @param produtoDto
	 * @param result
	 * @return
	 */
	@ApiOperation(value = "Rota para alterar um produto.")
	@PutMapping("/operacao/{id}")
	public ResponseEntity<Response<Produto>> alterarProduto(@PathVariable("id") Integer idproduto,
			@RequestBody ProdutoDto alterado, BindingResult result) {
		log.info("Rota para alterar um produto.");

		Response<Produto> response = new Response<Produto>();

		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}

		Produto produto = this.produtoService.listaProdutosById(idproduto);

		produto.setDescricao(alterado.getDescricao());
		produto.setIdcategoria(alterado.getIdcategoria());
		produto.setImagem(alterado.getImagem());
		produto.setPreco(alterado.getPreco());
		produto.setStatus(alterado.getStatus());
		produto.setTitulo(alterado.getTitulo());

		produto = this.produtoService.salvarProduto(produto);

		response.setData(produto);
		return ResponseEntity.ok(response);
	}

	/**
	 * Metodo - Rota para excluir um produto.
	 * 
	 * @param idproduto
	 */
	@ApiOperation(value = "Rota para excluir um produto.")
	@DeleteMapping("/operacao/{id}")
	public ResponseEntity<Response<String>> removerProduto(@PathVariable("id") Integer idproduto) {
		Response<String> response = new Response<String>();
		try {
			log.info("Rota para excluir um produto.");
			this.produtoService.removerProduto(idproduto);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			response.getErrors().add("Erro ao excluir o dado.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Metodo - Rota para listar todos os produtos ativos pelo idcategoria e titulo.
	 * 
	 * @param idcategoria
	 * @return
	 */
	@ApiOperation(value = "Rota para listar todos os produtos ativos pelo idcategoria e titulo.")
	@GetMapping("/categoria/{id}/ativos/{titulo}")
	public ResponseEntity<Response<List<Produto>>> listarProdutosAtivosPelaCategoriaeTitulo(
			@PathVariable("id") Integer idcategoria, @PathVariable("titulo") String titulo) {
		log.info("Rota para listar todos os produtos ativos pelo idcategoria e titulo.");
		Response<List<Produto>> response = new Response<List<Produto>>();
		try {
			List<Produto> produtos = this.produtoService.listarProdutosAtivosPelaCategoriaeTitulo(idcategoria, titulo);
			response.setData(produtos);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem produtos cadastrados com o idcategoria especificado.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Metodo - Rota para listar todos os produtos pelo idcategoria e titulo.
	 * 
	 * @param idcategoria
	 * @return
	 */
	@ApiOperation(value = "Rota para listar todos os produtos pelo idcategoria e titulo.")
	@GetMapping("/categoria/{id}/{titulo}")
	public ResponseEntity<Response<List<Produto>>> listarProdutosPelaCategoriaeTitulo(
			@PathVariable("id") Integer idcategoria, @PathVariable("titulo") String titulo) {
		log.info("Rota para listar todos os produtos pelo idcategoria e titulo.");
		Response<List<Produto>> response = new Response<List<Produto>>();
		try {
			List<Produto> produtos = this.produtoService.listarProdutosPelaCategoriaeTitulo(idcategoria, titulo);
			response.setData(produtos);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem produtos cadastrados com o idcategoria especificado.");
			return ResponseEntity.badRequest().body(response);
		}
	}

}