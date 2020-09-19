package br.com.marqfacil.api.services;

import java.util.List;

import br.com.marqfacil.api.dtos.SelectItemsProcedimentoDto;
import br.com.marqfacil.api.entities.Procedimento;

public interface ProcedimentoService {

	/**
	 * Metodo para listar todos os procedimentos
	 * 
	 * @return
	 */
	List<Procedimento> listAllProcedimentos();

	/**
	 * Metodo para exibir procedimento por idprocedimento
	 * 
	 * @param idprocedimento
	 * @return
	 */
	Procedimento listProcedimentoByIdProcedimento(Integer idprocedimento);

	/**
	 * Metodo para remover procedimento
	 * 
	 * @param idprocedimento
	 */
	void removerProcedimento(Integer idprocedimento);

	/**
	 * Metodo para salvar ou alterar procedimento
	 * 
	 * @param procedimento
	 * @return
	 */
	Procedimento salvarProcedimento(Procedimento procedimento);

	/**
	 * Metodo para listar todos os procedimentos de uma empresa
	 * 
	 * @param idempresa
	 * @return
	 */
	List<SelectItemsProcedimentoDto> listarProcedimentoPorEmpresa(Integer idempresa);

	/**
	 * Metodo para listar procedimentos ativos de uma categoria
	 * 
	 * @param idcategoria
	 * @return
	 */
	List<Procedimento> listarProcedimentosAtivosPorIdcategoria(Integer idcategoria);

	/**
	 * Metodo para listar todos os procedimentos de uma categoria
	 * 
	 * @param idcategoria
	 * @return
	 */
	List<Procedimento> listarPorIdCategoria(Integer idcategoria);

	/**
	 * Metodo para listar procedimentos ativos de uma categoria
	 * 
	 * @param idcategoria
	 * @return
	 */
	List<Procedimento> listarProcedimentosAtivosPorIdcategoriaETitulo(Integer idcategoria, String titulo);

	/**
	 * Metodo para listar todos os procedimentos de uma categoria
	 * 
	 * @param idcategoria
	 * @return
	 */
	List<Procedimento> listarPorIdCategoriaETitulo(Integer idcategoria, String titulo);

}