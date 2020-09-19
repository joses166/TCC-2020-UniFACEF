package br.com.marqfacil.api.converters;

import java.util.List;

import br.com.marqfacil.api.dtos.ProcedimentosSelectMultipleDto;
import br.com.marqfacil.api.dtos.SelectItemsProcedimentoDto;

public interface ProcedimentoConverter {

	ProcedimentosSelectMultipleDto ParseToDto(SelectItemsProcedimentoDto origin);

	List<ProcedimentosSelectMultipleDto> ParseListToDto(List<SelectItemsProcedimentoDto> origin);

}
