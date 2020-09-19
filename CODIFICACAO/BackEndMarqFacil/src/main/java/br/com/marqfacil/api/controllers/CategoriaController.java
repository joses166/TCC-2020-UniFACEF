package br.com.marqfacil.api.controllers;

import java.util.List;

import javax.validation.Valid;

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

import br.com.marqfacil.api.dtos.CategoriaDto;
import br.com.marqfacil.api.entities.Categoria;
import br.com.marqfacil.api.response.Response;
import br.com.marqfacil.api.services.CategoriaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/categorias")
@Api(value = "API para Sistema de Clínicas Estéticas.")
public class CategoriaController {

	private static final Logger log = LoggerFactory.getLogger(CategoriaController.class);

	@Autowired
	private CategoriaService categoriaService;

	/**
	 * Metodo - Rota para listar todas as categorias.
	 * 
	 * @return
	 */
	@ApiOperation(value = "Rota para listar todas as categorias.")
	@GetMapping
	public ResponseEntity<Response<List<Categoria>>> listarTodasCategorias() {
		log.info("Rota para listar todas as categorias.");
		Response<List<Categoria>> response = new Response<List<Categoria>>();
		try {
			List<Categoria> categorias = this.categoriaService.listAllCategorias();
			response.setData(categorias);
			return ResponseEntity.ok(response);
		} catch (Exception ex) {
			response.getErrors().add("Não existe nenhuma categoria cadastrada na base de dados.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Metodo - Rota para listar categoria pelo idcategoria.
	 * 
	 * @param idcategoria
	 * @return
	 */
	@ApiOperation(value = "Rota para listar categoria pelo idcategoria.")
	@GetMapping("/{id}")
	public ResponseEntity<Response<Categoria>> listarCategoriasPorIdcategoria(@PathVariable("id") Integer idcategoria) {
		log.info("Rota para listar categoria pelo idcategoria.");
		Response<Categoria> response = new Response<Categoria>();
		try {
			Categoria categoria = this.categoriaService.listCategoriaById(idcategoria);
			response.setData(categoria);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existe nenhuma categoria com o idcategoria especificado.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Metodo - Rota para listar categorias pelo tipo.
	 * 
	 * @param tipo
	 * @return
	 */
	@ApiOperation(value = "Rota para listar categorias pelo tipo.")
	@GetMapping("/{tipo}/empresa/{idempresa}")
	public ResponseEntity<Response<List<Categoria>>> listarCategoriasPorTipo(@PathVariable("tipo") Integer tipo,
			@PathVariable("idempresa") Integer idempresa) {
		log.info("Rota para listar categorias pelo tipo.");
		Response<List<Categoria>> response = new Response<List<Categoria>>();
		try {
			List<Categoria> categorias = this.categoriaService.listarPorTipoEIdempresa(tipo, idempresa);
			response.setData(categorias);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem categorias para o tipo especificado.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Metodo - Rota para cadastrar uma nova categoria.
	 * 
	 * @param categoriaDto
	 * @param result
	 * @return
	 */
	@ApiOperation(value = "Rota para cadastrar uma nova categoria.")
	@PostMapping("/operacao")
	public ResponseEntity<Response<Categoria>> salvarCategoria(@Valid @RequestBody CategoriaDto categoriaDto,
			BindingResult result) {
		log.info("Rota para cadastrar uma nova categoria.");

		Response<Categoria> response = new Response<Categoria>();

		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}

		Categoria categoria = new Categoria();

		categoria.setDescricao(categoriaDto.getDescricao());
		categoria.setIdcategoria(categoriaDto.getIdcategoria());
		categoria.setIdempresa(categoriaDto.getIdempresa());
		categoria.setTipo(categoriaDto.getTipo());

		categoria = this.categoriaService.salvarCategoria(categoria);

		response.setData(categoria);
		return ResponseEntity.ok(response);
	}

	/**
	 * Metodo - Rota para alterar uma categoria.
	 * 
	 * @param idcategoria
	 * @param alterada
	 * @param result
	 * @return
	 */
	@ApiOperation(value = "Rota para alterar uma categoria.")
	@PutMapping("/operacao/{id}")
	public ResponseEntity<Response<Categoria>> alterarCategoria(@PathVariable("id") Integer idcategoria,
			@Valid @RequestBody CategoriaDto alterada, BindingResult result) {
		log.info("Rota para alterar uma categoria.");

		Response<Categoria> response = new Response<Categoria>();

		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}

		Categoria categoria = this.categoriaService.listCategoriaById(idcategoria);

		categoria.setDescricao(alterada.getDescricao());
		categoria.setIdcategoria(alterada.getIdcategoria());
		categoria.setIdempresa(alterada.getIdempresa());
		categoria.setTipo(alterada.getTipo());

		categoria = this.categoriaService.salvarCategoria(categoria);

		response.setData(categoria);
		return ResponseEntity.ok(response);
	}

	/**
	 * Metodo - Rota para remover uma categoria.
	 * 
	 * @param idcategoria
	 */
	@ApiOperation(value = "Rota para remover uma categoria.")
	@DeleteMapping("/operacao/{id}")
	public ResponseEntity<Response<String>> removerCategoria(@PathVariable("id") Integer idcategoria) {
		Response<String> response = new Response<String>();
		try {
			log.info("Rota para remover uma categoria.");
			this.categoriaService.removerCategoria(idcategoria);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			response.getErrors().add("Erro ao excluir o dado.");
			return ResponseEntity.badRequest().body(response);
		}
	}

}