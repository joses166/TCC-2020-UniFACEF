package br.com.marqfacil.api.services.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.marqfacil.api.dtos.SelectItemsProcedimentoDto;
import br.com.marqfacil.api.entities.Procedimento;
import br.com.marqfacil.api.repositories.ProcedimentoRepository;
import br.com.marqfacil.api.services.ProcedimentoService;

@Service
public class ProcedimentoServiceImpl implements ProcedimentoService {

	private static final Logger log = LoggerFactory.getLogger(ProcedimentoServiceImpl.class);

	@Autowired
	private ProcedimentoRepository procedimentoRepository;

	@Override
	public List<Procedimento> listAllProcedimentos() {
		log.info("Retorna todos os procedimentos");
		return this.procedimentoRepository.findAll();
	}

	@Override
	public Procedimento listProcedimentoByIdProcedimento(Integer idprocedimento) {
		log.info("Retorna um procedimento específico");
		return this.procedimentoRepository.findById(idprocedimento).orElse(null);
	}

	@Override
	public void removerProcedimento(Integer idprocedimento) {
		log.info("Remover procedimento pelo id");
		this.procedimentoRepository.deleteById(idprocedimento);
	}

	@Override
	public Procedimento salvarProcedimento(Procedimento procedimento) {
		log.info("Salvar ou alterar procedimento");
		return this.procedimentoRepository.save(procedimento);
	}

	@Override
	public List<Procedimento> listarProcedimentosAtivosPorIdcategoria(Integer idcategoria) {
		log.info("Listar procedimentos ativos de uma categoria");
		return this.procedimentoRepository.findProcedimentosAtivosByIdcategoria(idcategoria);
	}

	@Override
	public List<Procedimento> listarPorIdCategoria(Integer idcategoria) {
		log.info("Listar procedimentos ativos de uma categoria");
		return this.procedimentoRepository.findByIdCategoria(idcategoria);
	}

	@Override
	public List<SelectItemsProcedimentoDto> listarProcedimentoPorEmpresa(Integer idempresa) {
		log.info("Listar procedimentos ativos de uma empresa");
		return this.procedimentoRepository.findProcedimentoByEmpresa(idempresa);
	}

	@Override
	public List<Procedimento> listarProcedimentosAtivosPorIdcategoriaETitulo(Integer idcategoria, String titulo) {
		log.info("Listar procedimentos ativos de uma categoria e titulo");
		return this.procedimentoRepository.findProcedimentosAtivosByIdcategoriaAndTitulo(idcategoria, titulo);
	}

	@Override
	public List<Procedimento> listarPorIdCategoriaETitulo(Integer idcategoria, String titulo) {
		log.info("Listar procedimentos ativos de uma categoria e titulo");
		return this.procedimentoRepository.findByIdCategoriaAndTitulo(idcategoria, titulo);
	}

}
