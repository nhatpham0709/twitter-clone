import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from '@headlessui/react'
import cn from 'clsx'
import { useModal } from '@/hooks/useModal'
import { preventBubbling } from '@/lib/utils'
import { Modal } from '@/components/modal/Modal'
import { HeroIcon } from '@/components/ui/HeroIcon'
import { Button } from '@/components/ui/Button'
import { MenuLink } from './MenuLink'
import type { Variants } from 'framer-motion'
import { DisplayModal } from '@/components/modal/DisplayModal'

export const variants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.2 } }
}

export function MoreSettings() {
  const { open, openModal, closeModal } = useModal()

  return (
    <>
      <Modal
        modalClassName='max-w-xl bg-main-background w-full p-8 rounded-2xl hover-animation'
        open={open}
        closeModal={closeModal}
      >
        <DisplayModal closeModal={closeModal} />
      </Modal>
      <Menu className='relative' as='div'>
        {({ open }) => (
          <>
            <Menu.Button className='group relative flex w-full py-1 outline-none'>
              <div
                className={cn(
                  `custom-button flex gap-4 text-xl transition group-hover:bg-light-primary/10 group-focus-visible:ring-2
                   group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 dark:group-focus-visible:ring-white
                   xl:pr-5`,
                  open && 'bg-light-primary/10 dark:bg-dark-primary/10'
                )}
              >
                <HeroIcon className='h-7 w-7' iconName='EllipsisHorizontalCircleIcon' />{' '}
                <p className='hidden xl:block'>More</p>
              </div>
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className='menu-container absolute -top-44 w-60 font-medium xl:w-11/12'
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item>
                    {({ active }) => (
                      <MenuLink
                        className={cn(
                          'flex w-full cursor-not-allowed gap-3 rounded-t-md p-4 duration-200',
                          active && 'bg-main-sidebar-background'
                        )}
                        href='/settings'
                        onClick={preventBubbling()}
                      >
                        <HeroIcon iconName='Cog8ToothIcon' />
                        Settings and privacy
                      </MenuLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <MenuLink
                        className={cn(
                          'flex w-full cursor-not-allowed gap-3 rounded-t-md p-4 duration-200',
                          active && 'bg-main-sidebar-background'
                        )}
                        href='/help-center'
                        onClick={preventBubbling()}
                      >
                        <HeroIcon iconName='QuestionMarkCircleIcon' />
                        Help center
                      </MenuLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Button
                        className={cn(
                          'flex w-full gap-3 rounded-none rounded-b-md p-4 duration-200',
                          active && 'bg-main-sidebar-background'
                        )}
                        onClick={openModal}
                      >
                        <HeroIcon iconName='PaintBrushIcon' />
                        Display
                      </Button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  )
}
