import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/database/entitites/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Cliente)
    private clientRepository: Repository<Cliente>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const tempClient = this.clientRepository.create(createClientDto);
      const client = await this.clientRepository.save(tempClient);
      return client;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  async findAll() {
    try {
      const ClientList = this.clientRepository.find();
      return ClientList;
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro interno no servidor',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException(
          `Não foi possivel encontrar esse cliente em nosso banco de dados`,
        );
      }
      return client;
    } catch (error) {
      throw new Error('Error ao buscar usuário por ID');
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException(
          `Não foi possivel atualizar esse candidato`,
        );
      }
      this.clientRepository.merge(client, updateClientDto);
      return await this.clientRepository.save(client);
    } catch (error) {
      throw new Error('Erro ao atualizar cliente');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.clientRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Cliente com ID #${id} não encontrado`);
      }
      return `Cliente com ID #${id} removido com sucesso`;
    } catch (error) {
      throw new Error('Erro ao remover cliente');
    }
  }
}
