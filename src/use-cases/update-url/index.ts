import type { UrlRepository } from "@/repositories/url-repository";
import type { UserRepository } from "@/repositories/user-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface UpdateUrlUseCaseParams {
  urlId: string;
  userId: string;
  origUrl: string;
}

export class UpdateUrlUseCase {
  constructor(
    private urlRepository: UrlRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(data: UpdateUrlUseCaseParams) {
    const user = await this.userRepository.findOne({ id: data.userId });

    if (!user) {
      throw new ResourceNotFoundError("User");
    }

    const url = await this.urlRepository.findOne({ urlId: data.urlId });

    if (!url) {
      throw new ResourceNotFoundError("Url");
    }

    await this.urlRepository.updateOne({
      origUrl: data.origUrl,
      urlId: data.urlId,
      userId: data.userId,
    });
  }
}
