import { mails } from "@/data/emali";
import { Separator } from "../ui/separator";
import { Divide, Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
export default function NavBar({ userId }: any) {
//   console.log(userId);
  return (
    <>
      {userId ? (
        <div className="h-14 bg-stone-600">
          {mails.map((item) => (
            <div key={item.id} className="">
              {item.id === userId && (
                <>
                  <div>
                    <Separator />
                    {item ? (
                      <div className="flex flex-1 flex-col relative">
                        <div className="flex items-start p-2">
                          <div className="flex items-start gap-4 text-sm">
                            <Avatar>
                              <AvatarImage alt={item.name} />
                              <AvatarFallback>
                                {item.name
                                  .split(" ")
                                  .map((chunk) => chunk[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                              <div className="font-semibold">{item.name}</div>
                              <div className="line-clamp-1 text-xs">
                                last seen
                              </div>
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <ScrollArea className="h-[510px]">
                          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                            {item.text}
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique maxime inventore asperiores, atque cum dicta corrupti neque adipisci nihil accusamus error quidem autem qui sit assumenda rem sint nobis et non veniam magnam, quis officia minus. Sit repellendus debitis accusantium, eveniet sint autem placeat architecto neque! Saepe laudantium accusantium molestiae obcaecati rem animi culpa magnam esse, alias amet quia dolorem aperiam hic ducimus ut cum illo autem. Ratione sed cum eum quidem consectetur excepturi, odio reprehenderit quam aut quis animi voluptatem quasi ipsa amet unde obcaecati saepe ex commodi possimus placeat sunt debitis, fuga id maiores! Nisi ullam consequatur veritatis minima velit architecto rem molestiae cum? Inventore facere corrupti nam. Quibusdam ipsam porro qui eveniet corrupti dolorem, delectus voluptatum dolorum ducimus consectetur mollitia omnis. Ullam, quaerat vel? Nisi, pariatur eos. Non eum ad consectetur velit ea doloremque veritatis voluptatibus. Assumenda voluptates deserunt sit quod nisi voluptas cum delectus veritatis, eos tempora id odit incidunt. Rerum, consequatur accusamus, deserunt exercitationem assumenda cumque sed repellendus iusto animi atque amet blanditiis! Amet laboriosam tempora nihil commodi! Nisi, quam hic, ipsam quasi corrupti, sequi impedit ipsum voluptate reprehenderit veniam rerum quibusdam dolor sapiente praesentium voluptatum alias totam nihil repellat autem debitis ea! Mollitia corporis velit explicabo repudiandae placeat quidem ipsam magni. Pariatur at velit, odio, quos laudantium optio molestias recusandae voluptates incidunt iste repellat architecto est. Totam ipsa, eius id architecto nisi repellat? Ab quo dolore eius natus. Totam, optio ipsum doloribus veritatis quas aut. Minus saepe similique fugit laborum corrupti modi blanditiis debitis nisi consectetur sed, dolore, provident sint sit deleniti ut esse et hic veritatis eligendi minima id! Voluptatibus et obcaecati cupiditate accusamus ut magnam totam voluptate maiores dolores, magni, vel non, asperiores dolorum! Consequuntur, aspernatur. Sequi accusamus odio numquam cupiditate, obcaecati placeat provident earum incidunt cumque. Quaerat optio vel quos ipsa. Sunt illum distinctio tempore, accusamus laboriosam earum explicabo quos eligendi ea possimus laudantium, suscipit rerum molestiae velit ratione beatae exercitationem sit. Libero laboriosam labore ullam quidem quia magni sed voluptatibus eveniet minus. Tempora quos debitis nobis quo. Debitis, rerum? Corporis iure asperiores magnam est facilis odit, fugit quod iusto voluptas ab dolorum excepturi hic nihil eaque? Saepe assumenda sint dolorem mollitia. Veritatis, odit quo est porro, labore atque vero facilis deleniti id, fugit iusto quasi impedit? Tempore laborum delectus perspiciatis tempora dolor, reprehenderit consequatur similique perferendis aliquam, dolorum recusandae voluptatum aut illum voluptate beatae culpa alias ex? Praesentium error reprehenderit a, dolorum excepturi nisi pariatur voluptatem illum illo rem corporis ad ipsa perspiciatis ullam nihil quibusdam ipsum officia laboriosam recusandae. Atque incidunt deserunt vero accusamus eaque velit officiis pariatur voluptatum asperiores fuga ipsa ducimus debitis laboriosam inventore nobis, dicta excepturi! Rem nihil, maiores, cum laudantium nam aut aperiam corrupti quas temporibus sequi pariatur blanditiis rerum quia, praesentium quisquam earum dolorem. Earum beatae eaque veniam cum, saepe inventore quos ducimus nostrum aut sunt assumenda. Odit ipsum neque iusto. Dolore consequatur, blanditiis perspiciatis sed animi placeat accusamus eum? Voluptatum voluptas deserunt harum, sapiente commodi numquam! Totam suscipit, expedita consequuntur sapiente explicabo corrupti quibusdam eum ipsum alias voluptatem accusantium voluptate, quod architecto temporibus mollitia reiciendis culpa nostrum id, magni at ullam dolores vitae consequatur! Officiis reiciendis illum mollitia consectetur dolores ut a porro, rerum veniam distinctio. Illum voluptatibus, consequatur quas mollitia deleniti fugit ex similique tempora obcaecati sint error nam pariatur odit fuga beatae molestias omnis libero maxime facere optio architecto perspiciatis quis! Eos dolores ipsa esse necessitatibus vitae? Ipsam omnis sequi impedit quis dignissimos, sapiente rem rerum nemo voluptates eaque recusandae unde explicabo maxime voluptatem expedita quas, illum harum sit incidunt, minima fugit cum. Consequuntur culpa impedit rem tempora dolores exercitationem voluptatem corporis. Molestias illum ducimus enim id sequi omnis alias est aspernatur nemo, pariatur consequatur dicta adipisci modi quo reiciendis temporibus, fuga repellat quasi obcaecati voluptate expedita veniam! Aperiam porro laboriosam hic harum suscipit, facere libero quam omnis sunt quia et iste veniam ipsum tempora atque sit laborum necessitatibus odit incidunt pariatur facilis praesentium adipisci? Cupiditate, repellendus et eligendi harum, ut placeat sapiente perferendis libero possimus fugiat sequi fuga sint nulla explicabo dolorem quidem eveniet tempore quisquam. Deserunt, quo, amet voluptas magnam dolores vero odit, possimus laborum quis voluptate earum voluptates itaque qui voluptatum maxime nam in illo dignissimos molestiae aliquam nulla tempore iusto. Beatae cumque nihil natus, atque, iure blanditiis soluta at vel et earum, hic tenetur. Veniam, non corrupti! Atque fugit facilis accusamus. Nostrum sunt in laudantium blanditiis quod ut eos dolor incidunt, omnis eum doloremque porro temporibus quae iure illum iusto eveniet. Veniam saepe ullam, rerum modi esse ad repellat reprehenderit dolores voluptatem, et laudantium ipsum inventore, reiciendis aliquid asperiores quae quidem quibusdam nihil est quia! Nesciunt dolores inventore ea provident velit illo, repellat aspernatur at aperiam fuga vitae aliquam deleniti numquam sapiente commodi molestias ex dignissimos dicta repudiandae. Cupiditate delectus dignissimos quidem ut alias eos! Similique, illo. Perspiciatis iure saepe et quia inventore sed neque deserunt quis adipisci id sint, modi, velit similique architecto dolorum. Laborum quis error eveniet saepe quidem nobis illo distinctio repellat similique doloremque, rem possimus praesentium temporibus rerum ducimus, sequi perspiciatis, quasi dolores sit facere voluptatum dignissimos. Dicta ex officiis numquam eum dignissimos ipsam aliquam obcaecati id distinctio expedita sequi soluta quis iste reprehenderit quidem minus tenetur, illo deserunt dolorem. Magnam praesentium obcaecati nobis dicta possimus vel accusamus voluptatum odit temporibus libero quod tempora dolor fugit tempore veniam nisi aliquid laborum, eum excepturi distinctio illum necessitatibus nemo? Ipsa, nostrum optio deserunt rem perspiciatis vitae dicta minus voluptate ad ab. Fuga, expedita fugiat, odio nulla veniam commodi libero possimus saepe et molestiae reiciendis harum, nostrum ipsam! Voluptatibus ab recusandae, doloremque consequatur soluta odit quibusdam magnam nihil laborum alias veniam, hic et aspernatur. Aliquid culpa corporis totam ipsum a esse consectetur amet porro facere. Ad consequuntur facilis eos modi! Perferendis consequuntur veritatis ex necessitatibus, at aut facilis. Veniam fugit sunt in illum cum iusto at quod incidunt consectetur doloremque unde eos esse nulla et omnis sit voluptas, possimus explicabo dolorem! Iusto aut ex reiciendis ad rerum voluptas odio necessitatibus at cumque, maxime consequatur illo atque!</p>
                          </div>
                        </ScrollArea>
                        <Separator className="mt-auto" />
                        <div className="p-4 bottom-0 relative">
                          <form>
                            <div className="relative">
                              <Send
                                className="absolute right-6 my-3"
                                size={24}
                              />
                              <Textarea placeholder="Search" className="pl-8" />
                            </div>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        No message selected
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) :<div>NO Message found </div>}
    </>
  );
}
