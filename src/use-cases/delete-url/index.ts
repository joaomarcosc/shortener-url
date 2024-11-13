import type { UrlRepository } from "@/repositories/url-repository";
import type { UserRepository } from "@/repositories/user-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface DeleteUrlUseCaseParams {
  userId: string;
  urlId: string;
}

export class DeleteUrlUseCase {
  constructor(
    private urlRepository: UrlRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(data: DeleteUrlUseCaseParams) {
    const user = await this.userRepository.findOne({ id: data.userId });

    if (!user) {
      throw new ResourceNotFoundError("User");
    }

    const url = await this.urlRepository.findOne({ urlId: data.urlId });

    if (!url) {
      throw new ResourceNotFoundError("Url");
    }

    await this.urlRepository.updateOne({ deletedAt: new Date(), urlId: data.urlId, userId: user.id });
  }
}
