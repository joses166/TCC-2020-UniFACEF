package br.com.marqfacil.api.converters.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import br.com.marqfacil.api.converters.ProcedimentoConverter;
import br.com.marqfacil.api.dtos.ProcedimentosSelectMultipleDto;
import br.com.marqfacil.api.dtos.SelectItemsProcedimentoDto;

@Component
public class ProcedimentoConverterImpl implements ProcedimentoConverter {

	@Override
	public List<ProcedimentosSelectMultipleDto> ParseListToDto(List<SelectItemsProcedimentoDto> origin) {
		if (origin == null)
			return null;
		List<ProcedimentosSelectMultipleDto> list = new ArrayList<ProcedimentosSelectMultipleDto>();
		origin.forEach(item -> list.add(ParseToDto(item)));

		return list;
	}

	@Override
	public ProcedimentosSelectMultipleDto ParseToDto(SelectItemsProcedimentoDto origin) {
		if (origin == null)
			return null;

		ProcedimentosSelectMultipleDto procedimento = new ProcedimentosSelectMultipleDto();
		procedimento.setLabel(origin.getDescricao());
		procedimento.setValue(origin.getIdprocedimento());

		return procedimento;
	}

}
