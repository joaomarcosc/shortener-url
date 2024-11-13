import type { UrlRepository } from "@/repositories/url-repository";
import type { UserRepository } from "@/repositories/user-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface SearchManyUrlUseCaseParams {
  perPage: number;
  page: number;
  order: "asc" | "desc";
  userId: string;
  query?: string;
}

export class SearchManyUrlUseCase {
  constructor(
    private urlRepository: UrlRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(data: SearchManyUrlUseCaseParams) {
    const user = await this.userRepository.findOne({ id: data.userId });

    if (!user) {
      throw new ResourceNotFoundError("User");
    }

    const urls = await this.urlRepository.searchMany(data);

    return urls;
  }
}
