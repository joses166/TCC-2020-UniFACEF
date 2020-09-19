package br.com.marqfacil.api.services.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.marqfacil.api.entities.Categoria;
import br.com.marqfacil.api.repositories.CategoriaRepository;
import br.com.marqfacil.api.services.CategoriaService;

@Service
public class CategoriaServiceImpl implements CategoriaService {

	private static final Logger log = LoggerFactory.getLogger(CategoriaServiceImpl.class);

	@Autowired
	private CategoriaRepository categoriaRepository;

	@Override
	public Categoria listCategoriaById(Integer idcategoria) {
		log.info("Exibe categoria por id");
		return this.categoriaRepository.findById(idcategoria).orElse(null);
	}

	@Override
	public Categoria salvarCategoria(Categoria categoria) {
		log.info("Salvar ou alterar categoria");
		return this.categoriaRepository.save(categoria);
	}

	@Override
	public void removerCategoria(Integer idcategoria) {
		log.info("Remover categoria por id");
		this.categoriaRepository.deleteById(idcategoria);
	}

	@Override
	public List<Categoria> listAllCategorias() {
		log.info("Retorna lista de categorias");
		return this.categoriaRepository.findAll();
	}

	@Override
	public List<Categoria> listarPorTipoEIdempresa(Integer tipo, Integer idempresa) {
		log.info("Retorna lista de categorias por id");
		return this.categoriaRepository.findByTipoAndIdempresa(tipo, idempresa);
	}

}