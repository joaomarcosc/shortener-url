import type { UrlRepository } from "@/repositories/url-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface GetShortedUrlUseCaseParams {
  urlId: string;
}

export class GetShortedUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute({ urlId }: GetShortedUrlUseCaseParams) {
    const url = await this.urlRepository.findOne({ urlId });

    if (!url) {
      throw new ResourceNotFoundError("url");
    }

    await this.urlRepository.updateOne({
      urlId,
      incClick: url.clicks + 1,
    });

    return url;
  }
}
