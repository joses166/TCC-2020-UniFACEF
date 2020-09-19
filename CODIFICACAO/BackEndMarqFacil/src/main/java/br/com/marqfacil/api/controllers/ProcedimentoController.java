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

import br.com.marqfacil.api.converters.ProcedimentoConverter;
import br.com.marqfacil.api.dtos.ProcedimentoDto;
import br.com.marqfacil.api.dtos.ProcedimentosSelectMultipleDto;
import br.com.marqfacil.api.dtos.SelectItemsProcedimentoDto;
import br.com.marqfacil.api.entities.Procedimento;
import br.com.marqfacil.api.response.Response;
import br.com.marqfacil.api.services.ProcedimentoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/procedimentos")
@Api(value = "API para Sistema de Clínicas Estéticas.")
public class ProcedimentoController {

	private static final Logger log = LoggerFactory.getLogger(ProcedimentoController.class);

	@Autowired
	private ProcedimentoService procedimentoService;

	@Autowired
	private ProcedimentoConverter ProcedimentoConverter;

	/**
	 * Rota para listar todos os procedimentos cadastrados.
	 * 
	 * @return
	 */
	@GetMapping
	@ApiOperation("Rota para listar todos os procedimentos cadastrados.")
	public ResponseEntity<Response<List<Procedimento>>> listarTodos() {
		log.info("Rota para listar todos os procedimentos cadastrados.");

		Response<List<Procedimento>> response = new Response<List<Procedimento>>();

		try {
			List<Procedimento> procedimentos = this.procedimentoService.listAllProcedimentos();
			response.setData(procedimentos);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem procedimentos cadastrados na base de dados.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Rota para listar o procedimento pelo id.
	 * 
	 * @return
	 */
	@GetMapping("/{id}")
	@ApiOperation("Rota para listar o procedimento pelo id.")
	public ResponseEntity<Response<Procedimento>> listarPeloId(@PathVariable("id") Integer idprocedimento) {
		log.info("Rota para listar o procedimento pelo id.");

		Response<Procedimento> response = new Response<Procedimento>();

		try {
			Procedimento procedimento = this.procedimentoService.listProcedimentoByIdProcedimento(idprocedimento);
			response.setData(procedimento);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existe procedimento com o id especificado.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Rota para listar todos os procedimentos ativos pela categoria.
	 * 
	 * @return
	 */
	@GetMapping("/ativos/{idcategoria}")
	@ApiOperation("Rota para listar todos os procedimentos ativos pela categoria.")
	public ResponseEntity<Response<List<Procedimento>>> listarProcedimentosAtivosPorIdcategoria(
			@PathVariable("idcategoria") Integer idcategoria) {
		log.info("Rota para listar todos os procedimentos ativos pela categoria.");

		Response<List<Procedimento>> response = new Response<List<Procedimento>>();

		try {
			List<Procedimento> procedimentos = this.procedimentoService
					.listarProcedimentosAtivosPorIdcategoria(idcategoria);
			response.setData(procedimentos);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem procedimentos cadastrados na base de dados.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Rota para listar todos os procedimentos pela categoria.
	 * 
	 * @return
	 */
	@GetMapping("/categoria/{idcategoria}")
	@ApiOperation("Rota para listar todos os procedimentos pela categoria.")
	public ResponseEntity<Response<List<Procedimento>>> listarPorIdCategoria(
			@PathVariable("idcategoria") Integer idcategoria) {
		log.info("Rota para listar todos os procedimentos pela categoria.");

		Response<List<Procedimento>> response = new Response<List<Procedimento>>();

		try {
			List<Procedimento> procedimentos = this.procedimentoService.listarPorIdCategoria(idcategoria);
			response.setData(procedimentos);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem procedimentos cadastrados na base de dados.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Rota para listar todos os procedimentos ativos de uma empresa.
	 * 
	 * @return
	 */
	@GetMapping("/empresa/{idempresa}")
	@ApiOperation("Rota para listar todos os procedimentos ativos de uma empresa.")
	public ResponseEntity<Response<List<SelectItemsProcedimentoDto>>> listarProcedimentoPorEmpresa(
			@PathVariable("idempresa") Integer idempresa) {
		log.info("Rota para listar todos os procedimentos pela categoria.");

		Response<List<SelectItemsProcedimentoDto>> response = new Response<List<SelectItemsProcedimentoDto>>();

		try {
			List<SelectItemsProcedimentoDto> procedimentos = this.procedimentoService
					.listarProcedimentoPorEmpresa(idempresa);
			response.setData(procedimentos);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem procedimentos cadastrados na base de dados.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Rota para listar todos os procedimentos ativos de uma empresa com conversão
	 * para atributo Label e Value.
	 * 
	 * @return
	 */
	@GetMapping("/empresa/{idempresa}/converter")
	@ApiOperation("Rota para listar todos os procedimentos ativos de uma empresa com conversão para atributo Label e Value.")
	public ResponseEntity<Response<List<ProcedimentosSelectMultipleDto>>> listarProcedimentoPorEmpresaLabelValue(
			@PathVariable("idempresa") Integer idempresa) {
		log.info(
				"Rota para listar todos os procedimentos ativos de uma empresa com conversão para atributo Label e Value.");

		Response<List<ProcedimentosSelectMultipleDto>> response = new Response<List<ProcedimentosSelectMultipleDto>>();

		try {
			List<SelectItemsProcedimentoDto> procedimentos = this.procedimentoService
					.listarProcedimentoPorEmpresa(idempresa);
			response.setData(ProcedimentoConverter.ParseListToDto(procedimentos));
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem procedimentos cadastrados na base de dados.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Rota para remover um procedimento.
	 * 
	 * @param idprocedimento
	 */
	@DeleteMapping("/operacao/{id}")
	@ApiOperation(value = "Rota para remover um procedimento.")
	public ResponseEntity<Response<String>> removerProcedimento(@PathVariable("id") Integer idprocedimento) {
		Response<String> response = new Response<String>();
		try {
			log.info("Rota para remover um procedimento.");
			this.procedimentoService.removerProcedimento(idprocedimento);
			return ResponseEntity.noContent().build();
		} catch (Exception ex) {
			response.getErrors().add("Erro ao excluir o dado.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Rota para cadastrar um novo procedimento.
	 * 
	 * @param procedimentoDto
	 * @param result
	 * @return
	 */
	@PostMapping("/operacao")
	@ApiOperation(value = "Rota para cadastrar um novo procedimento.")
	public ResponseEntity<Response<Procedimento>> salvarProcedimento(
			@Valid @RequestBody ProcedimentoDto procedimentoDto, BindingResult result) {

		log.info("Rota para cadastrar um novo procedimento.");

		Response<Procedimento> response = new Response<Procedimento>();

		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
		}

		Procedimento procedimento = new Procedimento();

		procedimento.setDescricao(procedimentoDto.getDescricao());
		procedimento.setDuracao(procedimentoDto.getDuracao());
		procedimento.setFgativo(1);
		procedimento.setIdcategoria(procedimentoDto.getIdcategoria());
		procedimento.setImagem(procedimentoDto.getImagem());
		procedimento.setStatus(procedimentoDto.getStatus());
		procedimento.setTitulo(procedimentoDto.getTitulo());

		procedimento = this.procedimentoService.salvarProcedimento(procedimento);

		response.setData(procedimento);
		return ResponseEntity.ok(response);
	}

	/**
	 * Rota para alterar um procedimento.
	 * 
	 * @param idprocedimento
	 * @param alterada
	 * @param result
	 * @return
	 */
	@PutMapping("/operacao/{id}")
	@ApiOperation(value = "Rota para alterar um procedimento.")
	public ResponseEntity<Response<Procedimento>> alterarProcedimento(@PathVariable("id") Integer idprocedimento,
			@Valid @RequestBody ProcedimentoDto alterada, BindingResult result) {

		log.info("Rota para alterar um procedimento.");

		Response<Procedimento> response = new Response<Procedimento>();

		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
		}

		Procedimento atual = this.procedimentoService.listProcedimentoByIdProcedimento(idprocedimento);

		atual.setDescricao(alterada.getDescricao());
		atual.setDuracao(alterada.getDuracao());
		atual.setIdcategoria(alterada.getIdcategoria());
		atual.setImagem(alterada.getImagem());
		atual.setStatus(alterada.getStatus());
		atual.setTitulo(alterada.getTitulo());

		atual = this.procedimentoService.salvarProcedimento(atual);

		response.setData(atual);
		return ResponseEntity.ok(response);
	}

	/**
	 * Rota para listar todos os procedimentos ativos pela categoria e titulo.
	 * 
	 * @return
	 */
	@GetMapping("/ativos/{idcategoria}/{titulo}")
	@ApiOperation("Rota para listar todos os procedimentos ativos pela categoria e titulo.")
	public ResponseEntity<Response<List<Procedimento>>> listarProcedimentosAtivosPorIdcategoriaETitulo(
			@PathVariable("idcategoria") Integer idcategoria, @PathVariable("titulo") String titulo) {
		log.info("Rota para listar todos os procedimentos ativos pela categoria e titulo.");

		Response<List<Procedimento>> response = new Response<List<Procedimento>>();

		try {
			List<Procedimento> procedimentos = this.procedimentoService
					.listarProcedimentosAtivosPorIdcategoriaETitulo(idcategoria, titulo);
			response.setData(procedimentos);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem procedimentos cadastrados na base de dados.");
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * Rota para listar todos os procedimentos pela categoria.
	 * 
	 * @return
	 */
	@GetMapping("/categoria/{idcategoria}/{titulo}")
	@ApiOperation("Rota para listar todos os procedimentos pela categoria e titulo.")
	public ResponseEntity<Response<List<Procedimento>>> listarPorIdCategoriaETitulo(
			@PathVariable("idcategoria") Integer idcategoria, @PathVariable("titulo") String titulo) {
		log.info("Rota para listar todos os procedimentos pela categoria e titulo.");

		Response<List<Procedimento>> response = new Response<List<Procedimento>>();

		try {
			List<Procedimento> procedimentos = this.procedimentoService.listarPorIdCategoriaETitulo(idcategoria,
					titulo);
			response.setData(procedimentos);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Não existem procedimentos cadastrados na base de dados.");
			return ResponseEntity.badRequest().body(response);
		}
	}

}